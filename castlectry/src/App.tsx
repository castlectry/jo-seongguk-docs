import './App.css'
import Banner from "./components/banner/Banner.tsx";
import { useGlobalScrollNavigation } from "./hooks/UseScrollNavigation.tsx";
import Header from "./components/layout/Header.tsx";
import AboutMe from "./components/about/AboutMe.tsx";
import Skills from "./components/skills/Skills.tsx";
// import Projects from "./components/projects/Projects.tsx";
import Career from "./components/carrer/Career.tsx";


export default function App() {

    // 섹션 순서 정의
    const { scrollNext } = useGlobalScrollNavigation([
        '.section-banner',
        '.section-myinfo',
        '.section-skills',
        // '.section-projects',
        '.section-career'
    ]);

    return (
        <>
            <Header />

            <div className="min-h-screen w-full bg-gradient-to-r from-blue-600 via-mint-600 to-pink-600 text-white">
                {/* 배너 섹션 */}
                <Banner checkWidth={false} scrollNext={scrollNext}/>

                <AboutMe />

                <Skills />

                {/*<Projects />*/}

                <Career />

            </div>
        </>
    );
}
