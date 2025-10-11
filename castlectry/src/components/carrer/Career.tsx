import SectionTitle from "../common/SectionTitle.tsx";
import SectionContainer from "../layout/SectionContainer.tsx";
import mayfarmLogo from "../../assets/images/mayfarm.jpg";

function Career() {
    const careerData = [
        {
            company: "메이팜소프트",
            period: "2023.06.02 - 2025.02.28",
            logo: mayfarmLogo,
            brand:
                "솔루션 / SI / ERP / CRM 분야의 스타트업 \n (현재 ‘큐비언트에이아이’라는 이름으로 사업장 변경)",
            description: `검색엔진 및 챗봇 솔루션 개발을 중심으로 성장 중인 스타트업입니다.
                          조직 내 다양한 SI 프로젝트와 기업 맞춤 솔루션 구축을 담당했습니다. 
                          백엔드(Spring)와 프론트엔드(JSP)를 함께 다루며 사용자 경험을 고려한 시스템 개선에 참여하며 경험을 쌓았습니다.`,
            roles: [
                {
                    title: "풀스택 웹개발 및 시스템 유지보수",
                    period: "2023.06 ~ 2025.02",
                    tasks: [
                        "전국 단위 SI 프로젝트 2건 참여 (웹, 모바일 웹 개발 및 유지보수)",
                        "OpenSearch 기반 자연어 처리 및 검색 시스템 개발",
                        "SearchAPI 설계 및 검색엔진 프로젝트 다수 참여",
                        "맞춤형 챗봇 시나리오 및 응답 로직 구현",
                        "정기점검 및 시스템 최적화, 버전 관리(GitLab) 담당",
                        "검색 증강 생성(RAG) 기술 기반의 데이터 프로토타입 개발 진행 중",
                    ],
                },
                {
                    title: "KIAT 한국산업기술진흥원 고도화 프로젝트",
                    period: "2024.09 ~ 2025.02",
                    tasks: [
                        "기업 요구사항을 기반으로 유지보수 및 기능 개발",
                        "Elasticsearch 데이터 RAG을 위한 임베딩 및 이관 작업",
                        "반복적인 질의 분석을 위한 데이터 전처리 로직 개발",
                    ],
                },
                {
                    title: "환경부 대기배출관리 시스템 - SEMS",
                    period: "2024.01 ~ 2024.08",
                    tasks: [
                        "https://sems.air.go.kr/web/usr/lgn/login.do",
                        "전국 공장 및 시설의 대기배출량 관리 시스템 개발 참여",
                        "jsp 기반 웹/모바일 웹 공통 모듈 설계",
                        "약 150개 기능의 화면 설계 및 모듈별 기능 분리",
                        "데이터 전송/수집 API 연동 및 시각화 구현",
                    ],
                },
                {
                    title: "중소벤처기업진흥공단 자연어 질의 처리(맞춤형 채용공고)",
                    period: "2023.12 ~ 2023.12",
                    tasks: [
                        "https://job.kosmes.or.kr/useGuidance/chatbotInfo/info.do",
                        "기존 FAQ 챗봇에서 사용자의 자연어 질의 기반 챗봇으로 확장",
                        "Elasticsearch 및 Java를 활용한 분기 로직 설계 및 질의 분석 시스템 구축",
                        "단기계약에서 장기계약 전환 성공"
                    ],
                },
                {
                    title: "RAG 기술 검토 및 프로토 타입 개발",
                    period: "2023.10 ~ 2023.11",
                    tasks: [
                        "기존 FAQ 챗봇의 한계 및 생성형 모델의 환상 및 비용 문제를 개선하기 위한 OpenAI 기반 RAG 기술 검토",
                        "RISS 논문 및 해외 포럼 문헌을 기반으로 자연어 응답 품질 검증",
                        "LangChain을 활용한 프로토타입 모델 구축 및 실증 테스트로 사내에서 개발 진행중"
                    ],
                },
                {
                    title: "해양수산과학기술진흥원",
                    period: "2023.09 ~ 2023.10",
                    tasks: [
                        "사내 솔루션 검색엔진 납품, 개발 및 유지보수",
                        "데이터 매칭 정확도 개선 및 검색 성능 튜닝으로 성능 70%이상 개선",
                    ],
                }
            ],
        },
    ];

    return (
        <SectionContainer
            id="career"
            className="section-career bg-[#111827] text-white relative overflow-hidden py-16 sm:py-24"
        >
            {/* Section Title */}
            <SectionTitle text={"Career"} />

            {/* Career Content */}
            <div className="w-full max-w-8xl mx-auto mt-10 px-6 sm:px-10">
                {careerData.map((career, idx) => (
                    <div key={idx}
                        className="flex flex-col md:flex-row gap-10 md:gap-16 items-start pb-12 mb-12 flex-wrap md:flex-nowrap overflow-visible">
                        {/* 왼쪽: 로고 및 브랜드 */}
                        <div className="md:basis-[45%] flex flex-col items-center md:items-end text-center md:text-left flex-shrink-0">
                            <img src={career.logo} alt={career.company} className="w-52 md:w-60 mb-4 object-contain rounded-lg shadow-md"/>
                            <p className="text-sm leading-relaxed whitespace-pre-line text-gray-400">
                                {career.brand}
                            </p>
                        </div>

                        {/* 오른쪽: 전체 내용 */}
                        <div
                            className="md:basis-[55%] flex flex-col space-y-6 min-w-0 flex-1 break-words overflow-visible">
                            {/* 회사명 및 기간 */}
                            <div>
                                <h3 className="text-2xl font-bold text-white">
                                    {career.company}
                                </h3>
                                <p className="text-sm text-gray-400 mt-1">{career.period}</p>
                            </div>

                            {/* 회사 설명 */}
                            <p className="leading-relaxed text-[15px] whitespace-pre-line">
                                {career.description}
                            </p>

                            {/* 역할 및 프로젝트 */}
                            <div className="space-y-8 mt-6">
                                {career.roles.map((role, i) => (
                                    <div
                                        key={i}
                                        className="border-l-4 border-indigo-300 pl-4 hover:border-indigo-400 transition-all duration-300 overflow-visible">
                                        <h4 className="text-lg font-semibold text-white">
                                            {role.title}
                                        </h4>
                                        <p className="text-sm text-gray-400 mt-1">{role.period}</p>

                                        <ul className="list-none list-inside mt-2 text-[15px] space-y-1 break-words whitespace-normal w-full min-w-0 overflow-visible leading-relaxed">
                                            {role.tasks.map((task, j) => {
                                                const isLink = task.startsWith("http://") || task.startsWith("https://");   // 링크 체크
                                                return (
                                                    <li key={j} className="break-words whitespace-normal">
                                                        -{" "}
                                                        {isLink ? (
                                                            <a href={task} target="_blank" className="text-indigo-400 hover:underline hover:text-indigo-300 transition-colors duration-200 break-all">
                                                                {task}
                                                            </a>
                                                        ) : ( task )}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </SectionContainer>
    );
}

export default Career;
