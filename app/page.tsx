import HeroSection from "@/components/hero-section";
import InvestorServices from "@/components/investor-services";
import StartupSolutions from "@/components/startup-solutions";
import Insights from "@/components/insights";
import NeuralPaths from "@/components/neural-paths";
import StarField from "@/components/StarField";

export default function Home() {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 md:h-[20vh] lg:h-[40vh] overflow-hidden -z-1">
        <StarField />
        
        {/* Elliptical radial gradient with blur effect and blend mode */}
        <div 
          aria-hidden="true"
          className="absolute top-0 left-1/2 w-[130vw] h-[40vw] max-w-[2200px] max-h-[700px] z-0 pointer-events-none mix-blend-overlay"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, rgba(210,210,255,0.15) 20%, rgba(200,200,255,0.08) 35%, rgba(255,255,255,0) 65%)',
            filter: 'blur(120px)',
            transform: 'translate(-50%, -45%)',
            borderRadius: '45% / 65%',
          }}
        />
      </div>
      <div className="max-w-screen-2xl mx-auto flex flex-col items-center justify-center px-4 lg:px-20 relative z-10">
        <HeroSection />
        <InvestorServices />
        <StartupSolutions />
        <Insights />
        <NeuralPaths />
      </div>
    </>
  );
}
