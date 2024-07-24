import PageContainer from "@/components/PageContainer";
import Hero from "./components/Hero";
import InfoSection from "./components/InfoSection";

const HomePage = () => {
  return (
    <PageContainer className="flex flex-col items-center justify-center bg-gray-100 pt-10">
      <Hero />
      <InfoSection />
    </PageContainer>
  );
};

export default HomePage;
