import { useEffect, useRef } from 'react';
import { animate } from "motion/react";

export function useGlobalScrollNavigation(selectors: string[], lockMs = 300) {  // lockMS (0.3초) (연속 스크롤 방지 변수)
    const currentIndexRef = useRef(0);
    const isLocked = useRef(false); // 스크롤 잠금 상태 저장
    const isAnimating = useRef(false);

    /*
    // 터치 관련
    const touchStartY = useRef(0);
    const touchDeltaY = useRef(0);
    const touchInProgress = useRef(false);
    */

    const sectionsRef = useRef<HTMLElement[]>([]);

    /* 현재 section DOM 수집 함수 */
    const computeSections = () =>
        selectors
            .map((sel) => document.querySelector(sel))
            .filter((el): el is HTMLElement => !!el);

    const clamp = (i: number) =>
        Math.max(0, Math.min(i, sectionsRef.current.length - 1));

    /* framer-motion animate 사용 */
    const smoothScrollTo = (targetY: number, duration = 1.7) => {
        const startY = window.scrollY;
        isAnimating.current = true;
        document.body.style.overflow = "hidden"; // 모바일 중복 스크롤 방지

        animate(startY, targetY, {
            duration,
            ease: [0.25, 1, 0.5, 1],
            onUpdate: (latest) => window.scrollTo(0, latest),
            onComplete: () => {
                isAnimating.current = false; // 스크롤 애니메이션 완료 후 해제
                document.body.style.overflow = "";
            },
        });
    };

    const scrollToIndex = (i: number) => {
        const idx = clamp(i);
        const el = sectionsRef.current[idx];
        if (!el || isLocked.current || isAnimating.current) return;    // 잠겨 있거나 애니메이션 진행중이면 무시

        isLocked.current = true;    // 스크롤 시작 (잠금)
        currentIndexRef.current = idx;  // 이동 즉시 인덱스 갱신

        const targetY = el.getBoundingClientRect().top + window.scrollY;

        smoothScrollTo(targetY, 0.6);   // 속도 조절 인수 전달을 통한 스크롤 이 동 시작 (작을수록 빨리)

        setTimeout(() => {
            isLocked.current = false;   // lockMs 초 후 이동 가능 설정
            // currentIndexRef.current = idx;
        }, lockMs);
    };

    const scrollNext = () => {
        if (currentIndexRef.current >= sectionsRef.current.length - 1) return;  // 마지막 section 인 경우 무시
        scrollToIndex(currentIndexRef.current + 1)
    };
    const scrollPrev = () => {
        if (currentIndexRef.current <= 0) return; // 처음 section 이면 무시
        scrollToIndex(currentIndexRef.current - 1);
    }

    useEffect(() => {
        sectionsRef.current = computeSections();

        // 경계 기반
        const updateIndex = () => {
            // if (isAnimating.current) return;    // 스크롤 중에는 index 업데이트 금지
            window.addEventListener('scroll', updateIndex, { passive: false });

            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;

            for (let i = 0; i < sectionsRef.current.length; i++) {
                const section = sectionsRef.current[i];
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;

                // 화면이 section 영역 안에 들어오면
                if (scrollTop + windowHeight / 2 >= top && scrollTop + windowHeight / 2 < bottom) {
                    currentIndexRef.current = i;
                    break;
                }
            }
        };

        // 스크롤 위치 섹션 경계에 닿았을 경우 이동
        const onWheel = (e: WheelEvent) => {
            if (isLocked.current) return;

            const currentSection = sectionsRef.current[currentIndexRef.current];
            if (!currentSection) return;

            const top = currentSection.offsetTop;
            const bottom = top + currentSection.offsetHeight;
            const scrollY = window.scrollY;

            const atTop = scrollY <= top;
            const atBottom = scrollY + window.innerHeight >= bottom - 5; // 약간의 여유값

            // 아래로 스크롤 하는 경우
            if (e.deltaY > 50 && atBottom) {
                scrollNext();
            }
            // 위로 스크롤 하는 경우
            else if (e.deltaY < -50 && atTop) {
                scrollPrev();
            }
        };

        const onKey = (e: KeyboardEvent) => {
            if (isLocked.current) return;
            if (e.key === 'ArrowDown' || e.key === 'Down') { e.preventDefault(); scrollNext(); }
            else if (e.key === 'ArrowUp' || e.key === 'Up') { e.preventDefault(); scrollPrev(); }
        };

        /* ----------- 모바일 터치 이벤트 ----------- */
        /*
        const onTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY;
            touchInProgress.current = true;
            touchDeltaY.current = 0;
        };

        const onTouchMove = (e: TouchEvent) => {
            if (!touchInProgress.current) return;
            const currentY = e.touches[0].clientY;
            touchDeltaY.current = touchStartY.current - currentY;
        };

        const onTouchEnd = () => {
            if (!touchInProgress.current || isLocked.current) return;
            touchInProgress.current = false;

            const diff = touchDeltaY.current;
            const THRESHOLD = 40; // 민감도 (손가락 이동 거리)
            if (Math.abs(diff) < THRESHOLD) return;

            const currentSection = sectionsRef.current[currentIndexRef.current];
            if (!currentSection) return;

            const top = currentSection.offsetTop;
            const bottom = top + currentSection.offsetHeight;
            const scrollY = window.scrollY;

            const margin = window.innerHeight * 0.15;
            const atTop = scrollY <= top + margin;
            const atBottom = scrollY + window.innerHeight >= bottom - margin;

            if (diff > 0 && atBottom) scrollNext(); // 아래로 드래그 (다음 섹션)
            else if(diff < 0 && atTop) scrollPrev(); // 위로 드래그 (이전 섹션)
        };
        */
        /* ----------- 모바일 터치 이벤트 ----------- */

        const onResize = () => { sectionsRef.current = computeSections(); updateIndex(); };

        /* 이벤트 등록 */
        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('keydown', onKey);
        /*
        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: true });
        window.addEventListener('touchend', onTouchEnd, { passive: true });
        */
        window.addEventListener('resize', onResize);
        window.addEventListener('scroll', updateIndex, { passive: true });
        updateIndex();


        return () => {
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('keydown', onKey);
            /*
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
            */
            window.removeEventListener('resize', onResize);
            window.removeEventListener('scroll', updateIndex);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectors.join('|'), lockMs]);

    return { scrollNext, scrollPrev, scrollToIndex };
}
