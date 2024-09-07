"use client";
import Image from "next/image";
import Typography from "@/components/Typography";
import derma from "../../../../../../public/derma.webp";
import ameria from "../../../../../../public/ameria.webp";
import exterior from "../../../../../../public/exterior.webp";
import autolab from "../../../../../../public/autolab.webp";
import { useTranslation } from "react-i18next";

const DATA = [{src: ameria, width: 240}, {src: autolab, width: 258}, {src: exterior, width: 258}, {src: derma, width: 258}];

const { Text } = Typography;

const Partners = () => {
  const { t } = useTranslation() as any;
  return (
    <div className="flex flex-col py-8 w-full">
      <Text color="black" className="mb-4">
        {t("partners")}
      </Text>
      <div className="md:flex justify-between gap-16">
        {DATA.map((el, idx) => (
          <Image key={idx} width={el.width} src={el.src} alt="partner" className="responsive"/>
        ))}
      </div>
    </div>
  );
};

export default Partners;
