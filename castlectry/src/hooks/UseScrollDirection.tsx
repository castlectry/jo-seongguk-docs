import { useState, useEffect, useRef } from "react";

/* 스크롤 방향 감지 훅 */
export function useScrollDirection(threshold = 10) {
    const [direction, setDirection] = useState<"up" | "down">("down");
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            const diff = currentY - lastScrollY.current;

            if (Math.abs(diff) > threshold) {
                setDirection(diff > 0 ? "down" : "up");
                lastScrollY.current = currentY;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [threshold]);

    return direction;
}
