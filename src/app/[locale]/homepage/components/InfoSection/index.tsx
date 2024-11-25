"use client";
import Image from "next/image";
import Typography from "@/components/Typography";
import ImgTablet from "../../../../../../public/tablets_car.webp";
import { useTranslation } from "react-i18next";
import PageContainer from "@/components/PageContainer";

const { Text } = Typography;

const InfoSection = () => {
  const { t } = useTranslation() as any;
  return (
    <>
      <PageContainer className="flex items-center lg:items-start flex-col lg:flex-row gap-4 py-8">
        <div className="flex lg:w-full max-w-[500px] lg:max-w-[704px] lg:flex-1 mr-0 lg:mr-6">
          <Image src={ImgTablet} alt="idea" className="rounded-xl max-w-full" />
        </div>
        <div className="flex flex-1 items-center lg:items-start flex-col pt-2 max-w-5xl">
          <Text className="xl:text-base text-sm lg:mt-0 mt-4 lg:text-left text-center self-center text-black max-w-5xl">
            {t("looking-to-reach-audience")}
          </Text>
        </div>
      </PageContainer>
      <div className="bg-white h-14 w-full mt-2" />
    </>
  );
};

export default InfoSection;
