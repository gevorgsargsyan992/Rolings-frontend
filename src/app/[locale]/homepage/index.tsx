import PageContainer from "@/components/PageContainer";
import Hero from "./components/Hero";
import InfoSection from "./components/InfoSection";
import InfoSectionCars from "./components/InfoSection2";
import Partners from "./components/Partners";

const HomePage = () => {
  return (
    <PageContainer className="flex flex-col items-center justify-center bg-gray-100 pt-10">
      <Hero />
      <InfoSection />
      <InfoSectionCars />
      <Partners />
    </PageContainer>
  );
};

export default HomePage;
