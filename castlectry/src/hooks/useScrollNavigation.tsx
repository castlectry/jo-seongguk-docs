import { useEffect, useRef } from 'react';
import { animate } from "motion/react";

export function useGlobalScrollNavigation(selectors: string[], lockMs = 300) {  // lockMS (0.3초) (연속 스크롤 방지 변수)
    const currentIndexRef = useRef(0);
    const isLocked = useRef(false); // 스크롤 잠금 상태 저장
    const touchStartY = useRef(0);
    const sectionsRef = useRef<HTMLElement[]>([]);

    /* 현재 section DOM 수집 함수 */
    const computeSections = () =>
        selectors
            .map((sel) => document.querySelector(sel))
            .filter((el): el is HTMLElement => !!el);

    const clamp = (i: number) =>
        Math.max(0, Math.min(i, sectionsRef.current.length - 1));

    /* framer-motion animate 사용 */
    const smoothScrollTo = (targetY: number, duration = 1.2) => {
        const startY = window.scrollY;
        animate(startY, targetY, {
            duration,
            ease: [0.25, 1, 0.5, 1],
            onUpdate: (latest) => window.scrollTo(0, latest),
        });
    };

    const scrollToIndex = (i: number) => {
        const idx = clamp(i);
        const el = sectionsRef.current[idx];
        if (!el || isLocked.current) return;    // 잠겨 있다면 무시

        isLocked.current = true;    // 스크롤 시작 (잠금)
        const targetY = el.getBoundingClientRect().top + window.scrollY;

        smoothScrollTo(targetY, 0.6);   // 속도 조절 인수 전달을 통한 스크롤 이 동 시작 (작을수록 빨리)

        setTimeout(() => {
            isLocked.current = false;   // lockMs 초 후 이동 가능 설정
            currentIndexRef.current = idx;
        }, lockMs);
    };

    const scrollNext = () => scrollToIndex(currentIndexRef.current + 1);
    const scrollPrev = () => scrollToIndex(currentIndexRef.current - 1);

    useEffect(() => {
        sectionsRef.current = computeSections();

        const updateIndex = () => {
            const midscreen = window.scrollY + window.innerHeight / 2;
            // 현재 화면 중앙과 가장 가까운 섹션을 active 로
            let idx = 0;
            for (let i = 0; i < sectionsRef.current.length; i++) {
                const top = sectionsRef.current[i].getBoundingClientRect().top + window.scrollY;
                if (midscreen >= top) idx = i; else break;
            }
            currentIndexRef.current = idx;
        };

        const onWheel = (e: WheelEvent) => {
            if (isLocked.current) return;
            if (e.deltaY > 50) scrollNext();
            else if (e.deltaY < -50) scrollPrev();
        };

        const onKey = (e: KeyboardEvent) => {
            if (isLocked.current) return;
            if (e.key === 'ArrowDown' || e.key === 'Down') { e.preventDefault(); scrollNext(); }
            else if (e.key === 'ArrowUp' || e.key === 'Up') { e.preventDefault(); scrollPrev(); }
        };

        const onTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
        const onTouchEnd = (e: TouchEvent) => {
            if (isLocked.current) return;
            const diff = touchStartY.current - e.changedTouches[0].clientY;
            if (diff > 50) scrollNext();
            else if (diff < -50) scrollPrev();
        };

        const onResize = () => { sectionsRef.current = computeSections(); updateIndex(); };

        updateIndex();
        window.addEventListener('wheel', onWheel, { passive: true });
        window.addEventListener('keydown', onKey);
        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchend', onTouchEnd, { passive: true });
        window.addEventListener('resize', onResize);
        window.addEventListener('scroll', updateIndex, { passive: true });

        return () => {
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('keydown', onKey);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchend', onTouchEnd);
            window.removeEventListener('resize', onResize);
            window.removeEventListener('scroll', updateIndex);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectors.join('|'), lockMs]);

    return { scrollNext, scrollPrev, scrollToIndex };
}
