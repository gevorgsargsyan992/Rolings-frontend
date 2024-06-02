"use client";
import { FC } from "react";
import Image from "next/image";
import Button from "../Button";
import Typography from "../Typography";
import rolingsImg from "../../../public/rolings-hero.png";
import Advantages from "./components/Advantages/Advantages";

const {Text, Title} = Typography

const Hero: FC = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full">
        <div className="flex flex-1 flex-col">
          <div className="flex justify-start">
            <Button className="mr-4">Lorem</Button>
            <Button type="ghost">Lorem ipsum</Button>
          </div>
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col pt-10 text-left">
              <Title level={5} color="text-gray-900">
                Lorem ipsum
              </Title>
                <Title level={5} color="text-gray-900">
                dolor
              </Title>
              <Title level={5} className="uppercase" color="text-blue-500">
                consect tur
              </Title>
            </div>
            <Text level={6} bold color="text-black">
              Advantages of our network
            </Text>
          </div>
        </div>
        <div className="flex flex-1 w-full">
          <Image
            objectFit="contain"
            src={rolingsImg}
            alt="test image"
          />
        </div>
      </div>
      <div className="flex flex-col w-full pt-10">
        <Advantages />
      </div>
    </div>
  );
};

export default Hero;
