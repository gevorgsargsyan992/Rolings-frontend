"use client";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import Typography from "@/components/Typography";
import Advantages from "./components/Advantages";

const { Text } = Typography;

const Hero: FC = () => {
  const { t } = useTranslation() as any;
  const currentLanguage = window.localStorage.getItem("language");

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col md:flex-row w-full">
        <div className="flex flex-1 flex-col md:mr-4">
          <div className="flex justify-center md:justify-start">
            <div className="bg-blue-royal rounded-full text-white px-4 py-2 text-base mr-0 md:mr-4 text-xs md:text-sm text-center">
              {t("stay-focused")}
            </div>
          </div>
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col pt-10 text-center md:text-start">
              <Text
                className="xl:text-4xl lg:text-2xl text-xl"
                color="text-gray-900"
              >
                {t("first-interactive")}
              </Text>
              <Text
                className="xl:text-4xl lg:text-2xl text-xl"
                color="text-gray-900"
              >
                {t("advertisement")}
              </Text>
              <Text
                className="uppercase mt-4 xl:text-4xl lg:text-2xl text-xl"
                color="text-blue-500"
              >
                {t('in-armenia')}
              </Text>
            </div>
            <Text
              bold
              color="text-black"
              className="mt-2 text-center md:text-start md:text-base text-sm"
            >
              {t("advatages-our-network")}
            </Text>
          </div>
        </div>
        <div className="flex flex-1 w-full mt-8 md:mt-0 md:block">
          <div className="relative w-full h-full">
            <video
              className="inset-0 w-full h-full object-cover rounded-xl"
              src={currentLanguage ? `/rolings${currentLanguage}.mov` : `/rolingsen.mov`}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full pt-10">
        <Advantages />
      </div>
    </div>
  );
};

export default Hero;
