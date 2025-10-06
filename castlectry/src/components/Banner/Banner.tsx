import {useEffect, useRef, useState} from 'react';
import '../../styles/Banner.css';
import arrowDown from "../../assets/images/banner/arrow-down.png";

interface BannerProps {
    checkWidth: boolean;
}

interface DesignItem {
    index: number;
    style: React.CSSProperties;
}

export default function Banner({ checkWidth }: BannerProps) {

    const [designItem, setDesignItem] = useState<{
        circle: DesignItem[];
        pill: DesignItem[];
    }>({
        circle: [],
        pill: [],
    });

    const isScrolling = useRef(false); //
    const touchStartY = useRef(0);

    useEffect(() => {
        // 랜덤 duration 부여
        const createItems = (count: number): DesignItem[] =>
            Array.from({ length: count }, (_, i) => ({
                index: i + 1,
                style: { animationDuration: `${Math.floor(Math.random() * 5 + 2)}s` },
            }));

        setDesignItem({
            circle: createItems(6),
            pill: createItems(6),
        });
    }, []);

    // 다음 배너로 이동
    const handleScrollNext = () => {
        const target = document.querySelector('.section-myinfo');

        if (target && !isScrolling.current) {
            isScrolling.current = true;
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY,
                behavior: 'smooth',
            });

            // 1초 뒤 다시 스크롤 가능하게 (연속 스크롤 방지)
            setTimeout(() => {
                isScrolling.current = false;
            }, 1000);
        }

    };

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (isScrolling.current) return;
            if (e.deltaY > 50) {
                // 아래로 스크롤 → 다음 섹션
                handleScrollNext();
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            const touchEndY = e.changedTouches[0].clientY;
            const diff = touchStartY.current - touchEndY;
            if (diff > 50) {
                // 아래로 스와이프 -> 다음 섹션
                handleScrollNext();
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' || e.key === 'Down') {
                e.preventDefault();
                handleScrollNext();
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: true });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <section
            className="section-banner relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-[100%] max-w-[100vw] overflow-x-hidden min-h-screen">
            <div
                className="banner-content w-full mx-auto flex flex-col items-center justify-center text-center h-screen">
                <div
                    className="banner-title text-[4rem] mb-[8%] px-8 font-[AppleSDGothicNeoEB00] font-normal break-keep">
                    <div className="banner-animation-left">WELCOME!</div>
                    <div className="banner-animation-right">SEONGGUK'S PORTFOLIO</div>
                </div>

                <button
                    className="banner-more-button absolute bottom-[2%] left-1/2 w-6 h-6 cursor-pointer z-[50]"
                    onClick={handleScrollNext}
                    style={{
                        background: `url(${arrowDown}) no-repeat center`,
                        backgroundSize: "contain",
                    }}
                    aria-label="scroll down"
                />

                {!checkWidth && (
                    <div className="banner-design-wrapper relative h-[246px]">
                        {Object.entries(designItem).map(([key, elements]) =>
                            elements.map((el) => (
                                <div
                                    key={`${key}-${el.index}`}
                                    className={`${key} ${key}-${el.index}`}
                                    style={el.style}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
