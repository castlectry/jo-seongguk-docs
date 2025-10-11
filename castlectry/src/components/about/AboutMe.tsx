import SectionContainer from "../layout/SectionContainer.tsx";
import profileImg from "../../assets/images/profile.jpg";
import SectionTitle from "../common/SectionTitle.tsx";
import ProfileInfo from "./ProfileInfo.tsx";

export default function AboutMe() {
    return (
        <SectionContainer id="about" className="section-myinfo bg-[#111827] text-white relative">

            {/* Section Title */}
           <SectionTitle text={"About Me"} />

            {/* 인적 정보 (분리 컴포넌트 호출) */}
            <ProfileInfo />

            {/* 본문 (프로필 + 소개) */}
            <div
                className="mt-12 flex flex-col md:flex-row
                        gap-10 px-6 md:px-16 max-w-6xl w-full
                        text-center md:text-left md:items-center">

                {/* 프로필 이미지 */}
                <img src={profileImg} alt="Profile"
                     className="w-[254px] h-[372px] object-cover
                        rounded-xl border-[3px] border-gray-500 shadow-lg
                        mx-auto md:items-center" />

                {/* 소개 텍스트 */}
                <div
                    className="flex flex-col gap-4 text-sm sm:text-base leading-relaxed max-w-3xl mt-6 md:mt-0 text-left">
                    <h3 className="text-xl sm:text-2xl font-bold text-white pb-1 mb-2 text-center">
                        성장하는 개발자
                    </h3>

                    <span className="text-white">
                        안녕하세요.
                        <br/> <br/>
                        끊임없이 배우며 성장하는 개발자{" "}
                        <span className="font-semibold">조성국</span>입니다.
                        <br/> <br/>
                        저는 새로운 기술을 단순히 배우는 데 그치지 않고,{" "}
                        <span className="text-indigo-400 font-semibold">실제 서비스에 적용하며 그 가치를 검증하는 과정</span>
                        을 중요하게 생각합니다.
                        <br/><br/>
                        JSP 기반의 서버 사이드 렌더링(SSR) 환경에서 안정적인 서비스 구조를 구현하고, React와 TypeScript를 활용한 클라이언트 사이드 렌더링(CSR) 개발을 통해{" "}
                        사용자 경험 중심의 UI를 구축하고자 합니다.
                    </span>

                    화면과 서버를 모두 이해하는{" "}
                    풀스택 관점을 바탕으로 Spring Framework 기반의{" "}
                    백엔드 아키텍처 설계, 데이터 연동, 보안 검토 등
                    실제 서비스 환경에서 요구되는 안정성과 확장성 중심의 개발을 수행했습니다.

                    <span>
                        저는 <span className="text-indigo-400 font-semibold">문제를 깊이 이해하고 구조적으로 해결하는 과정</span>을 성장의 기회로 생각합니다.
                        <br/> <br/>
                        새로운 기술과 도전 속에서도 학습을 즐기며, {" "}
                        <span className="text-indigo-400 font-semibold">
                          더 나은 사용자 경험과 품질을 만들어가는 개발자
                        </span>
                        가 되고자 합니다.
                    </span>
                </div>
            </div>
        </SectionContainer>
    );
}
