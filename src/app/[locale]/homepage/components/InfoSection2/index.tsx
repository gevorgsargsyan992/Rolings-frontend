"use client";
import Image from "next/image";
import Typography from "@/components/Typography";
import ImgCars from "../../../../../../public/cars.svg";

const { Text } = Typography;

const DATA = [
  "Հասանելիության բարձր մակարդակ: Մեր էկրանները տեղադրված են տաքսիներում, որոնք ամեն օր տասնյակ հազարավոր մարդիկ են օգտվում:",
  "Նորարարական տեխնոլոգիա: Մեր էկրանները ապահովում են բարձր որակի պատկերներ և անսահման հնարավորություններ գովազդի համար:",
  "Գովազդները ցուցադրվում են 24/7 ռեժիմով, ապահովելով առավելագույն տեսանելիություն:",
  "Թիրախավորում գովազդում: Մեր համակարգը թույլ է տալիս գովազդատուներին նպատակային ցուցադրություններ ապահովել, ելնելով տաքսիի երթուղուց և գոտիներից:",
];

const InfoSection = () => (
  <div className="flex items-center lg:items-start flex-col lg:flex-row gap-4 py-8">
    <div className="flex flex-1 items-center lg:items-start flex-col">
      <Text
        className="text-sm xl:mt-0 mt-4 uppercase xl:ml-4"
        bold
        color="black"
      >
        ՄԵՐ ԱՌԱՆՁՆԱՀԱՏԿՈՒԹՅՈՒՆՆԵՐԸ
      </Text>
      <ul className="list-disc list-inside">
        {DATA.map((el) => (
          <li key={el} className="mt-4 xl:text-base text-sm" id={el}>
            {el}
          </li>
        ))}
      </ul>
    </div>
    <div className="flex lg:w-full max-w-[500px] lg:max-w-[704px] lg:flex-1">
      <Image src={ImgCars} alt="cars" />
    </div>
  </div>
);

export default InfoSection;
