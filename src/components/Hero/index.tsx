"use client";
import { FC } from "react";
import Image from "next/image";
import {useTranslation} from "react-i18next";
import Button from "../Button";
import Typography from "../Typography";
import rolingsImg from "../../../public/rolings-hero.png";
import Advantages from "./components/Advantages";

const { Text } = Typography;

const Hero: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full">
        <div className="flex flex-1 flex-col">
          <div className="flex justify-center md:justify-start">
            <Button className="mr-0 md:mr-4 text-xs md:text-sm">
              {t('common:stay-focused')}
            </Button>
          </div>
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col pt-10 text-center md:text-start">
              <Text
                className="xl:text-4xl lg:text-2xl text-xl"
                color="text-gray-900"
              >
                Առաջին ինտերակտիվ
              </Text>
              <Text
                className="xl:text-4xl lg:text-2xl text-xl"
                color="text-gray-900"
              >
                գովազդը
              </Text>
              <Text
                className="uppercase mt-4 xl:text-4xl lg:text-2xl text-xl"
                color="text-blue-500"
              >
                Հայաստանում
              </Text>
            </div>
            <Text
              bold
              color="text-black"
              className="mt-2 text-center md:text-start md:text-base text-sm"
            >
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
