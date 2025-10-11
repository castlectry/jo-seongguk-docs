import {useEffect, useState} from 'react';
import '../../styles/banner/Banner.css';
import arrowDown from "../../assets/images/banner/arrow-down.png";

interface BannerProps {
    checkWidth: boolean;
    scrollNext: () => void;
}

interface DesignItem {
    index: number;
    style: React.CSSProperties;
}

export default function Banner({ checkWidth, scrollNext }: BannerProps) {

    const [designItem, setDesignItem] = useState<{
        circle: DesignItem[];
        pill: DesignItem[];
    }>({
        circle: [],
        pill: [],
    });


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

    return (
        <section
            className="section-banner relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-[100%] max-w-[100vw] overflow-x-hidden min-h-screen">
            <div
                className="banner-content w-full mx-auto flex flex-col items-center justify-center text-center h-screen">
                <div
                    className="banner-title text-[4rem] mb-[8%] px-8 font-[AppleSDGothicNeoEB00] font-normal break-keep">
                    <div className="banner-animation-left">WELCOME!</div>
                    <div className="banner-animation-right">SEONGGUK'S PAGE</div>
                </div>

                <button
                    className="banner-more-button absolute bottom-[2%] left-1/2 w-6 h-6 cursor-pointer z-[50]"
                    onClick={scrollNext}
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
