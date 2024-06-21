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
    <div className="flex flex-col w-full 2xl:px-36">
      <div className="flex w-full">
        <div className="flex flex-1 flex-col">
          <div className="flex justify-start">
            <Button className="mr-4">Եղեք ուշադրության կենտրոնում</Button>
          </div>
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col pt-10 text-left">
              <Text level={1} color="text-gray-900">
                Առաջին ինտերակտիվ
              </Text>
              <Text level={1} color="text-gray-900">
                գովազդը
              </Text>
              <Text level={1} className="uppercase mt-4" color="text-blue-500">
                Հայաստանում
              </Text>
            </div>
            <Text level={6} bold color="text-black">
              Մեր ցանցի առավելությունները
            </Text>
          </div>
        </div>
        <div className="flex flex-1 w-full">
          <Image objectFit="contain" src={rolingsImg} alt="test image" />
        </div>
      </div>
      <div className="flex flex-col w-full pt-10">
        <Advantages />
      </div>
    </div>
  );
};

export default Hero;
