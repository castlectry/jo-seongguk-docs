export default function SectionTitle({ text }: { text: string }) {
    return (
        <div className="
            w-full flex flex-col items-center justify-center
            relative z-10
            mt-20 md:mt-32 mb-16">
            <h2 className="
                text-4xl md:text-5xl font-extrabold text-white text-center tracking-wide
                after:content-['']
                after:block after:w-full after:h-[5px]
                after:bg-gradient-to-l after:from-indigo-800 after:to-blue-200
                after:mx-auto after:mt-2.5 pointer-events-none">
                {text}
            </h2>
        </div>
    );
}