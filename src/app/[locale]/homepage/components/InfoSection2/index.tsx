"use client";
import Image from "next/image";
import Typography from "@/components/Typography";
import ImgDriver from "../../../../../../public/driver.webp";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import PageContainer from "@/components/PageContainer";

const { Text } = Typography;

const InfoSection = () => {
  const { t } = useTranslation() as any;
  const DATA = useMemo(
    () => [t("benefit-1"), t("benefit-2"), t("benefit-3"), t("benefit-4")],
    [t]
  );
  return (
    <PageContainer className="flex items-center lg:items-start flex-col lg:flex-row gap-4 py-8">
      <div className="flex flex-1 items-center lg:items-start flex-col max-w-5xl">
        <Text
          className="text-sm xl:mt-0 mt-4 uppercase xl:ml-4 text-black"
          bold
        >
          {t("our_features")}
        </Text>
        <ul className="list-disc list-inside">
          {DATA.map((el) => (
            <li
              key={el}
              className="mt-4 xl:text-base text-sm text-black"
              id={el}
            >
              {el}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex lg:w-full max-w-[500px] lg:max-w-[704px] lg:flex-1">
        <Image src={ImgDriver} alt="cars" className="rounded-xl" />
      </div>
    </PageContainer>
  );
};

export default InfoSection;
