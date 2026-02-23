import Hero from "./components/Hero";
import InfoSection from "./components/InfoSection";
import InfoSectionCars from "./components/InfoSection2";
import Partners from "./components/Partners";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <Hero />
      <InfoSection />
      <InfoSectionCars />
      <Partners />
    </div>
  );
};

export default HomePage;
