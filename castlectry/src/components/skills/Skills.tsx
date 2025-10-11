import SectionTitle from "../common/SectionTitle.tsx";
import SectionContainer from "../layout/SectionContainer.tsx";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Skills() {

    // skill bar 호버시 이벤트
    const [showTooltip, setShowTooltip] = useState(false);

    const skillCategories = [
        {
            title: "FrontEnd",
            skills: [
                { label: "HTML5", level: 65 },
                { label: "CSS3", level: 50 },
                { label: "Javascript", level: 65 },
                { label: "React.js", level: 50 }
            ],
        },
        {
            title: "BackEnd",
            skills: [
                { label: "Spring", level: 60 },
                { label: "MySQL", level: 60 },
                { label: "Oracle", level: 60 },
                { label: "Elasticsearch", level: 40 },
                { label: "Django", level: 20 }
            ],
        },
        {
            title: "Configuration Management",
            skills: [
                { label: "GitHub", level: 70 },
                { label: "GitLab", level: 70 }
            ],
        },
        {
            title: "Communication",
            skills: [
                { label: "Jira", level: 70 },
                { label: "Slack", level: 40 },
                { label: "Figma", level: 20 },
            ],
        },
    ];

    return (
        <SectionContainer
            id="skills"
            className="section-skills bg-[#111827] text-gray-300
                relative flex flex-col items-center justify-center
                py-16 sm:py-24">

            {/* Section Title */}
            <SectionTitle text={"Skills"}/>

            {/* 안내 표시 바 */}
            <div className="relative w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mb-8 px-4 flex flex-col items-center"
                 onMouseEnter={() => setShowTooltip(true)}
                 onMouseLeave={() => setShowTooltip(false)}>

                {/* Tooltip */}
                {showTooltip && (
                    <div className="absolute -top-28 left-1/2 -translate-x-1/2 bg-gray-100 text-gray-800 text-sm rounded-xl shadow-lg px-5 py-3 w-80 animate-fadeIn z-50">
                        <p className="font-semibold mb-1">입문: <span className="font-normal">한번 경험해본 기술 스택</span></p>
                        <p className="font-semibold mb-1">초급: <span className="font-normal">코드를 보고 디버깅이 가능</span></p>
                        <p className="font-semibold mb-1">중급: <span className="font-normal">코드를 이해하며 어느 정도 학습됨</span></p>
                        <p className="font-semibold">고급: <span className="font-normal">코드를 응용해서 구현에 익숙함</span></p>
                        <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-4 h-4 bg-gray-100 rotate-45"></div>
                    </div>
                )}

                {/* 상단 그라데이션 바 */}
                <div className="w-full h-3 rounded-full bg-gradient-to-r from-blue-200 to-indigo-600"></div>

                {/* 단계명 줄 */}
                <div className="w-full mt-3 grid grid-cols-9 text-gray-300 text-center">
                    {["·", "입문", "·", "초급", "·", "중급", "·", "고급", "·"].map((label, i) => (
                        <span
                            key={i}
                            className="flex-1 text-[13px] sm:text-sm whitespace-nowrap">
                          {label}
                        </span>
                    ))}
                </div>

                {/* 하단 숫자 */}
                <div className="w-full mt-1 grid grid-cols-9 text-gray-400 text-center">
                    {["0", "-", "25", "-", "50", "-", "75", "-", "100"].map((num, i) => (
                        <span
                            key={i}
                            className="flex-1 text-[11px] sm:text-xs whitespace-nowrap">
                          {num}
                        </span>
                    ))}
                </div>
            </div>


            <div className="w-full max-w-6xl px-4 sm:px-8 mt-8 space-y-10">
                <>
                    {skillCategories.map((category) => (
                        <div key={category.title} className="mb-10">
                            {/* 소제목 */}
                            <h2 className="text-lg sm:text-xl font-bold text-white mb-4 text-center">
                                {category.title}
                            </h2>

                            <div className="space-y-4">
                                {category.skills.map((s) => (
                                    <div key={s.label}>
                                        {/* 라벨 + 퍼센트 */}
                                        <div className="flex justify-between text-xs sm:text-sm text-gray-300 mb-1">
                                            <span className={"font-semibold"}>{s.label}</span>
                                            {/*<span>{s.level}%</span>*/}
                                        </div>

                                        {/* 프로그레스 바 */}
                                        <div className="relative w-full h-5 bg-gray-800 rounded-md overflow-hidden">
                                            <motion.div
                                                initial={{width: 0}}
                                                whileInView={{width: `${s.level}%`}}
                                                viewport={{once: false}}
                                                transition={{duration: 1.2, ease: "easeOut"}}
                                                className="h-full bg-gradient-to-r from-blue-200 to-indigo-600 rounded-md flex items-center justify-end pr-2"
                                            >
                                                <span className="text-xs font-semibold text-white">
                                                    {s.level}%
                                                </span>
                                            </motion.div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </>
            </div>
        </SectionContainer>
    );
}
