"use client";
import { FC } from "react";
import Image from "next/image";
import Button from "../Button";
import Typography from "../Typography";
import rolingsImg from "../../../public/rolings-hero.png";
import Index from "./components/Advantages";

const { Text, Title } = Typography;

const Hero: FC = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full">
        <div className="flex flex-1 flex-col">
          <div className="flex justify-start">
            <Button className="mr-4">Exeq ushadrutyan kentronum</Button>
          </div>
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col pt-10 text-left">
              <Title level={5} color="text-gray-900">
                arajin interactive
              </Title>
              <Title level={5} color="text-gray-900">
                govazde
              </Title>
              <Title level={5} className="uppercase mt-4" color="text-blue-500">
                Hayastanum
              </Title>
            </div>
            <Text level={6} bold color="text-black">
              Advantages of our network
            </Text>
          </div>
        </div>
        <div className="flex flex-1 w-full">
          <Image objectFit="contain" src={rolingsImg} alt="test image" />
        </div>
      </div>
      <div className="flex flex-col w-full pt-10">
        <Index />
      </div>
    </div>
  );
};

export default Hero;
