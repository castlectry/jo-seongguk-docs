import './App.css'
import Banner from "./components/banner/Banner.tsx";
import { useGlobalScrollNavigation } from "./hooks/useScrollNavigation.tsx";
import Header from "./components/layout/Header.tsx";


export default function App() {

    // 섹션 순서 정의
    const { scrollNext } = useGlobalScrollNavigation([
        '.section-banner',
        '.section-myinfo',
        // '.section-projects',
        // '.section-contact',
    ]);

    return (
        <>
            <Header />
            <div className="min-h-screen w-full bg-gradient-to-r from-blue-600 via-mint-600 to-pink-600 text-white">
                {/* 배너 섹션 */}
                <Banner checkWidth={false} scrollNext={scrollNext}/>

                {/* 다음 섹션 (스크롤 테스트용) */}
                <section
                    className="section-myinfo h-screen flex flex-col items-center justify-center bg-gray-900 text-center"
                >
                    <h2 className="text-4xl font-bold mb-4">About Me</h2>
                    <p className="max-w-xl text-gray-300">
                        Banner에서 아래 화살표 버튼 클릭 시 스크롤되는 영역<br/>
                    </p>
                    {/* TODO: 모바일 환경 동적 랜더링 및 컴포넌트 구성
                                헤더
                                Skills
                                Projects
                                Carrer 컴포넌트 구성
                      */}
                </section>
            </div>
        </>
    );
}
