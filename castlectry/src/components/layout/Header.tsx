import { useEffect, useState } from "react";
import "../../styles/layout/Header.css";

export default function Header() {
    // 사용자 배너 영역 체크 변수 [false: 배너 | true: 배너 밖]
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {    // 스크롤 동작 시
            // 배너 높이 계산 (첫 섹션)
            const bannerHeight = window.innerHeight * 0.8;
            setScrolled(window.scrollY > bannerHeight - 100);   // 배너 아래인 경우 scrolled true 설정
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);    // 언마운트 시 이벤트 리스너 제거
    }, []);

    /*
    * TODO: 모바일 환경 헤더 적용 (menu-icon 이미지 활용), section 이동 공통 모듈 추가
    * */

    const moveToSection = (selector: string) => {
        const target = document.querySelector(selector);
        if (!target) return;

        // 해당 섹션의 화면 상단 이동
        window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY,
            behavior: 'smooth',
        });
    }

    return (
        <header className={`header-container ${scrolled ? "scrolled" : ""}`}>
            <div className="header-logo">SEONGGUK</div>

            <nav className="header-nav">
                {/*  */}
                <button onClick={() => moveToSection('.section-myinfo')}>About</button>
                <button onClick={() => moveToSection('#projects')}>Projects</button>
                <button onClick={() => moveToSection('#contact')}>Contact</button>
            </nav>
        </header>
    );
}
