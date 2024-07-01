"use client";
import { FC } from "react";
import Image from "next/image";
import Button from "../Button";
import Typography from "../Typography";
import rolingsImg from "../../../public/rolings-hero.png";
import Advantages from "./components/Advantages";

const { Text } = Typography;

const Hero: FC = () => {
  return (
    <div className="flex flex-col w-full px-4">
      <div className="flex w-full">
        <div className="flex flex-1 flex-col">
          <div className="flex justify-start">
            <Button className="mr-4">Եղեք ուշադրության կենտրոնում</Button>
          </div>
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col pt-10 text-left">
              <Text className="2xl:text-4xl xl:text-4xl lg:text-2xl" color="text-gray-900">
                Առաջին ինտերակտիվ
              </Text>
              <Text className="2xl:text-4xl xl:text-4xl lg:text-2xl" color="text-gray-900">
                գովազդը
              </Text>
              <Text className="uppercase mt-4 2xl:text-4xl xl:text-4xl lg:text-2xl" color="text-blue-500">
                Հայաստանում
              </Text>
            </div>
            <Text bold color="text-black" className='mt-2'>
              Մեր ցանցի առավելությունները
            </Text>
          </div>
        </div>
        <div className="flex flex-1 w-full hidden md:block">
          <Image src={rolingsImg} alt="test image" />
        </div>
      </div>
      <div className="flex flex-col w-full pt-10">
        <Advantages />
      </div>
    </div>
  );
};

export default Hero;
