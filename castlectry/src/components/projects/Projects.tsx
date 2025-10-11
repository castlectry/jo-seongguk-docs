import SectionTitle from "../common/SectionTitle.tsx";
import SectionContainer from "../layout/SectionContainer.tsx";

function Projects() {
    return (
        <SectionContainer id="about" className="section-myinfo bg-[#111827] text-white relative overflow-hidden">

            {/* Section Title */}
            <SectionTitle text={"Projects"} />

        </SectionContainer>
    );
}

export default Projects;