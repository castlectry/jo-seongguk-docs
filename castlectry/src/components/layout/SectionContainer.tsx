import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useScrollDirection } from "../../hooks/UseScrollDirection.tsx";

interface Props {
    id: string;
    className?: string; /* section 구분 */
    children: React.ReactNode;
}

function SectionContainerBase({ id, className = "",children }: Props) {

    const ref = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(ref, {
        amount: 0.2,     // 20% 이상 보이면 활성화
        once: false,     // 다시 스크롤할 때도 애니메이션 반복
    });
    const direction = useScrollDirection(); // 현재 스크롤 방향 취득

    return (
        <section
            id={id}
            className={`${className} relative flex flex-col justify-center items-center px-4 sm:px-8 pb-20`}
        >
            {/* 등장 및 퇴장 제어 */}
            <motion.div
                ref={ref}
                style={{ willChange: "transform" }}
                initial={{ opacity: 0, y: 40 }}
                animate={
                    isInView
                        ? { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
                        : direction === "up"
                            ? { opacity: 0, y: 100 } // 위로 스크롤: 아래로 사라짐
                            : { opacity: 0, y: 0 } // 아래로 스크롤: 유지
                }

                className="w-full flex flex-col justify-center items-center"
            >
            {children}
            </motion.div>
        </section>
    );
}

const SectionContainer = React.memo(SectionContainerBase);
export default SectionContainer;