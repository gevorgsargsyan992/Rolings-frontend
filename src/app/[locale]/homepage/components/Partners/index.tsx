"use client";
import Image from "next/image";
import Typography from "@/components/Typography";
import derma from "../../../../../../public/derma.webp";
import ameria from "../../../../../../public/ameria.webp";
import exterior from "../../../../../../public/exterior.webp";
import autolab from "../../../../../../public/autolab.webp";
import { useTranslation } from "react-i18next";

const DATA = [ameria, autolab, exterior, derma];

const { Text } = Typography;

const Partners = () => {
  const { t } = useTranslation() as any;
  return (
    <div className="flex flex-col py-8 w-full">
      <Text color="black" className="mb-4 tex text-center lg:text-start">
        {t("partners")}
      </Text>
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
    </div>
  );
};

export default Partners;
