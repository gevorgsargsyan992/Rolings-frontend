"use client";
import Image from "next/image";
import Typography from "@/components/Typography";
import derma from "../../../../../../public/derma.webp";
import ameria from "../../../../../../public/ameria.webp";
import exterior from "../../../../../../public/exterior.webp";
import autolab from "../../../../../../public/autolab.webp";
import { useTranslation } from "react-i18next";
import PageContainer from "@/components/PageContainer";

const DATA = [ameria, autolab, exterior, derma];

const { Text } = Typography;

const Partners = () => {
  const { t } = useTranslation() as any;
  return (
    <>
      <div className="flex bg-white w-full mt-2">
        <Text
          color="black"
          className="lg:text-start text-xl pt-8 2xl:pl-40 pl-20 pb-1 bold text-center"
        >
          {t("partners")}
        </Text>
      </div>
      <PageContainer className="flex flex-col py-8 w-full">
        <div className="md:flex flex-col lg:flex-row justify-between self-center lg:self-auto gap-10">
          {DATA.map((el, idx) => (
            <Image
              key={idx}
              src={el}
              width={200}
              alt="partner"
              className="mt-6 lg:mt-0"
              style={{ objectFit: "contain" }}
            />
          ))}
        </div>
      </PageContainer>
    </>
  );
};

export default Partners;
