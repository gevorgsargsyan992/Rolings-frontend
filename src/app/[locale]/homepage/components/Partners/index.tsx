"use client";
import Image from "next/image";
import Typography from "@/components/Typography";
import loyal from "../../../../../../public/loyal.webp";
import ameria from "../../../../../../public/ameria.webp";
import exterior from "../../../../../../public/exterior.webp";
import autolab from "../../../../../../public/autolab.webp";
import { useTranslation } from "react-i18next";
import PageContainer from "@/components/PageContainer";

const DATA = [
  { image: ameria, url: "https://ameriabank.am/", height: 36 },
  { image: autolab, url: "https://www.autolab.am/", height: 14 },
  { image: exterior, url: "https://exterior.am/", height: 40 },
  { image: loyal, url: "https://loyal.am/hy", height: 60 },
];

const { Text } = Typography;

const Partners = () => {
  const { t } = useTranslation() as any;
  return (
    <>
      <div className="flex bg-white w-full mt-2 justify-center">
        <div className="w-full self-center max-w-[2000px]">
          <Text
            color="black"
            className="lg:text-start text-xl pt-8 2xl:pl-40 pl-20 pb-1 bold text-center"
          >
            {t("partners")}
          </Text>
        </div>
      </div>
      <PageContainer className="flex flex-col py-6 w-full">
        <div className="md:flex flex-col lg:flex-row justify-between self-center lg:self-auto mx-auto w-full max-w-[2000px]">
          {DATA.map((el, idx) => (
            <a
              target="_blank"
              href={`${el.url}`}
              className="flex mt-6 lg:mt-0"
              key={idx}
            >
              <Image
                src={el.image}
                height={el.height}
                alt="partner"
                style={{ objectFit: "contain" }}
              />
            </a>
          ))}
        </div>
      </PageContainer>
    </>
  );
};

export default Partners;
