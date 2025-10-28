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
                        JSP와 React 기반의 웹 서비스를 직접 설계하고 구현해온 개발자{" "}
                        <span className="text-indigo-400 font-semibold">조성국</span>입니다.
                        <br/> <br/>
                        클라이언트 영역에서는{" "}
                        <span className="text-indigo-400 font-semibold">JSP, React, TypeScript, Tailwind CSS</span>
                        를 활용해 사용자 흐름이 자연스러운 인터페이스를 만들었습니다.
                        <br/><br/>
                        상태 관리와 비동기 통신을 직접 설계하며 성능과 유지보수성을 고려한 구조 설계 경험을 통해 화면과
                        서버 양쪽의 동작을 이해하는 풀스택 역량을 쌓았습니다.
                    </span>

                    새로운 기술을 익힐 때마다 단순히 배우는 데서 그치지 않고 실제 서비스에 적용하며 완성도를 높이고 있습니다.

                    <span>
                        저는 <span className="text-indigo-400 font-semibold">문제를 깊이 이해하고 구조적으로 해결하는 과정</span>을 성장의 기회로 생각합니다.
                        <br/> <br/>
                        새로운 기술과 도전 속에서도 학습을 즐기며 {" "}
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
