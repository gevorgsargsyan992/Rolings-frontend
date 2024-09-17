import PageContainer from "@/components/PageContainer";
import Hero from "./components/Hero";
import InfoSection from "./components/InfoSection";
import InfoSectionCars from "./components/InfoSection2";
import Partners from "./components/Partners";
import Pricing from "@/app/[locale]/homepage/components/Pricing";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 pt-10">
      <Hero />
      <InfoSection />
      <InfoSectionCars />
      <Partners />
      <Pricing />
    </div>
  );
};

export default HomePage;
