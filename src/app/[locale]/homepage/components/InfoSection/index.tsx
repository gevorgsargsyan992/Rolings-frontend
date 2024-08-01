import Image from "next/image";
import Typography from "@/components/Typography";
import ImgCars from "../../../../../../public/cars.svg";
import Button from "@/components/Button";

const { Text } = Typography;

const InfoSection = () => {
  return (
    <div className="flex items-center lg:items-start flex-col lg:flex-row gap-4 py-8">
      <div className="flex lg:w-full max-w-[500px] lg:max-w-[704px] lg:flex-1">
        <Image src={ImgCars} alt="cars" />
      </div>
      <div className="flex flex-1 items-center lg:items-start flex-col">
        <div className="bg-blue-royal max-w-max rounded-full text-white px-4 py-2 text-base mr-0 text-xs md:text-sm">
          Consectetur Adipiscing
        </div>
        <Text
          className="uppercase xl:mt-4 mt-3 xl:text-4xl lg:text-2xl text-xl"
          color="text-blue-500"
        >
          consect tur RUT
        </Text>
        <Text className="text-sm xl:mt-8 mt-4">
          Praesent mollis mollis ex, nec lobortis elit commod ac. Cras quis nisl
          felis. Phasellus sed nisl iaculis, luctus est at, pulvinar tellus.
          Suspendisse consectetur dolor dolor, in efficitur purus pretium eget.
          Integer iaculis quam id commodo consectetur. Phasellus egestas luctus
          est quis tempus. In auctor porta posuere.
        </Text>
        <Button type="ghost" className="max-w-max xl:mt-6 mt-4">
          Go to the section
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;
