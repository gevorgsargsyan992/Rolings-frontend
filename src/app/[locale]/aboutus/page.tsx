"use client";
import { FC, useMemo } from "react";
import Image from "next/image";
import Typography from "@/components/Typography";
import imgRolings from "../../../../public/rolings-rectangle.svg";
import PageContainer from "@/components/PageContainer";
import { useTranslation } from "react-i18next";

const { Text, Title } = Typography;

const VerticalTimeline: FC = () => {
  const { t } = useTranslation() as any;

  const items: string[] = useMemo(
    () => [t("rolings-info1"), t("rolings-info2"), t("rolings-info3")],
    [t]
  );

  return (
    <PageContainer className="flex gap-10 bg-white pb-40 pt-10">
      <div className="w-full flex items-start hidden md:flex flex-1 sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg mx-auto">
        <Image src={imgRolings} alt="rolings image" layout="responsive" />
      </div>
      <div className="flex flex-col flex-1 items-start pl-12 max-h-[480px] overflow-y-auto">
        <Title
          color="text-black"
          className="font-semibold text-xl md:text-2xl lg:text-6xl"
          level={3}
        >
          {t("aboutus")}
        </Title>
        <Text color="text-gray-800" className="mt-2 mb-10 font-normal">
          {t("future-your-business")}
        </Text>
        {items.map((item, index) => (
          <div key={index} className="flex">
            <div
              className={`flex flex-col items-center h-full ${
                index === items.length - 1 ? "pb-4" : ""
              }`}
            >
              <div className="flex items-center justify-center w-7 h-7 bg-blue-800  rounded-full">
                <Text className="text-white">{index + 1}</Text>
              </div>
              {index !== items.length && (
                <div className="h-full border-l-2 border-gray-500 pb-4" />
              )}
            </div>
            <Text
              className="pb-4 pl-8 font-medium text-sm lg:text-base"
              color="text-black"
            >
              {item}
            </Text>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default VerticalTimeline;
