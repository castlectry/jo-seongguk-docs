import { useEffect, useState } from "react";
import { X, Github, Mail } from "lucide-react";

import "../../styles/layout/Header.css";
import "../../assets/images/layout/menu-icon.png";
import menuIcon from "../../assets/images/layout/menu-icon.png";

export default function Header() {
    const [scrolled, setScrolled] = useState(false); // 사용자 배너 영역 체크 변수 [false: 배너 | true: 배너 밖]
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {    // 스크롤 동작 시
            // 배너 높이 계산 (첫 섹션)
            const bannerHeight = window.innerHeight * 0.8;
            setScrolled(window.scrollY > bannerHeight - 100);   // 배너 아래인 경우 scrolled true 설정
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);    // 언마운트 시 이벤트 리스너 제거
    }, []);

    const moveToSection = (selector: string) => {
        const target = document.querySelector(selector);
        if (!target) return;

        // 해당 섹션의 화면 상단 이동
        window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY,
            behavior: 'smooth',
        });

        setMenuOpen(false); // 메뉴 닫기 실행
    }

    // 모바일 메뉴 소셜 데이터
    const socialLinks = [
        {
            icon: <Github />,
            label: "GitHub",
            href: "https://github.com/castlectry",
        },
        {
            icon: <Mail />,
            label: "Mail",
            href: "mailto:ksturtle2@naver.com",
        },
    ];

    return (
        <header className={`header-container ${scrolled ? "scrolled" : ""} relative`}>
            <div className={`header-logo pointer-events-none text-lg 
            text-black ${scrolled ? 'md:text-black' : 'md:text-white'}`}>Seong Guk</div>

            {/* PC 환경 */}
            <nav className="header-nav">
                {/*  */}
                <button onClick={() => moveToSection('.section-myinfo')}>About</button>
                {/*<button onClick={() => moveToSection('.section-projects')}>Projects</button>*/}
                <button onClick={() => moveToSection('.section-skills')}>Skills</button>
                <button onClick={() => moveToSection('.section-career')}>Career</button>
            </nav>

            {/* 모바일 메뉴 아이콘 */}
            <button className="menu-icon" aria-label="Open Menu"
                style={{
                    background: `url(${menuIcon}) no-repeat center`,
                    backgroundSize: "contain",
                }}
                onClick={() => setMenuOpen(!menuOpen)}
            ></button>

            {/* 오버레이 닫기 */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                    onClick={() => setMenuOpen(!menuOpen)}
                ></div>
            )}

            {/* 드로어 메뉴 (오른쪽 슬라이드) */}
            <div className={`fixed top-0 right-0 h-full w-3/5 sm:w-2/5 bg-white text-black shadow-lg z-50 transform transition-transform duration-500 flex flex-col ${
                    menuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex justify-between items-center px-6 py-5 border-b-2 border-gradient-to-r from-indigo-400 to-purple-500">
                    <h1 className="text-lg font-bold text-gray-900 tracking-wide">
                        SEONGGUK
                    </h1>
                    <button onClick={() => setMenuOpen(false)} aria-label="Close Menu">
                        <X size={28} className="text-gray-700 hover:text-gray-900" />
                    </button>
                </div>

                {/* 메뉴 목록 */}
                <nav className="flex flex-col text-lg font-semibold space-y-6 px-8 mt-10">
                    <button
                        onClick={() => moveToSection(".section-myinfo")}
                        className="transition-colors text-left">
                        About me
                    </button>
                    <button
                        onClick={() => moveToSection(".section-skills")}
                        className="transition-colors text-left">
                        Skills
                    </button>
                    <button
                        onClick={() => moveToSection(".section-career")}
                        className="transition-colors text-left">
                        Career
                    </button>
                </nav>

                {/* SNS 링크 */}
                <div className="mt-auto px-8 pb-10 space-y-6 text-base font-medium">
                    {socialLinks.map(({icon, label, href}) => (
                        <a key={label} href={href} target="_blank" className="flex items-center space-x-4 hover:text-indigo-600 transition-colors">
                            <div
                                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:border-indigo-400 transition-colors">
                                {icon}
                            </div>
                            <span className="font-semibold">{label}</span>
                        </a>
                    ))}
                </div>
            </div>
        </header>
    );
}
