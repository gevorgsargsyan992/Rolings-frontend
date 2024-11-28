"use client";
import Typography from "@/components/Typography";
import { useTranslation } from "react-i18next";
import PageContainer from "@/components/PageContainer";
import Carousel from "@/app/[locale]/homepage/components/Partners/components/Carousel";

const { Text } = Typography;

const Partners = () => {
  const { t } = useTranslation() as any;
  return (
    <>
      <div className="flex bg-white w-full mt-2 justify-center">
        <div className="w-full self-center max-w-[2000px]">
          <Text
            color="black"
            className="lg:text-start text-2xl pt-8 2xl:pl-40 pl-20 pb-1 bold text-center"
          >
            {t("partners")}
          </Text>
        </div>
      </div>
      <PageContainer className="flex flex-col py-6 w-full bg-white">
        <Carousel />
      </PageContainer>
    </>
  );
};

export default Partners;
