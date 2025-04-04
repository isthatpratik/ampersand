import HeroSection from "@/components/hero-section";
import InvestorServices from "@/components/investor-services";

export default function Home() {
  return (
    <div className="max-w-screen-2xl mx-auto flex flex-col items-center justify-center px-20">
      <HeroSection />
      <InvestorServices />
    </div>
  );
}
