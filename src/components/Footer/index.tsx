"use client";
import Typography from "@/components/Typography";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/Input";
import { DATA, INFO_DATA } from "./constants";
import { useState } from "react";
import PageContainer from "../PageContainer";
import Icon from "@/components/Icon";
import { useTranslation } from "react-i18next";
// import youtubeImg from "../../../public/youtube.webp";
import instagramImg from "../../../public/instagram.webp";
import facebookImg from "../../../public/facebook.webp";
import logoRotated from "../../../public/rolings-rotate.webp";

const { Text } = Typography;

const SOCIAL_NETWORK = [
  { imgSrc: instagramImg, url: "https://www.instagram.com/rolings_official/" },
  { imgSrc: facebookImg, url: "https://www.facebook.com/profile.php?id=61555657757405&locale=ru_RU" },
  // { imgSrc: youtubeImg, url: "" }, //TODO: check if we need it in the future
];

const Footer = () => {
  const { t } = useTranslation() as any;
  const [email, setEmail] = useState<string>("");

  return (
      <footer className="w-full bg-white 2xl:py-8 py-4">
        <PageContainer className="flex md:px-0 md:pl-20 justify-center md:pr-8 w-full">
          <div className="flex">
            <Image className="hidden lg:block 2xl:w-[30px] w-[30px] h-[110px]" src={logoRotated}  alt="logo image" />
          </div>
          <div className="flex md:flex-row w-full flex-col justify-center md:justify-between lg:gap-6 mx-8 max-w-6xl">
            <div className="flex flex-col gap-y-4">
              {INFO_DATA().map(({ iconName, text, id }) => (
                <div className="flex justify-center md:justify-start" key={id}>
                  <Icon
                    name={iconName}
                    className="mr-2 self-center"
                    color="text-gray-dark"
                  />
                  <Text className="text-lg lg:text-base md:text-xs">
                    {text}
                  </Text>
                </div>
              ))}
            </div>
            {DATA().map((elem, idx) => (
              <div className="flex flex-col mt-6 md:mt-0" key={idx}>
                {elem?.title && (
                  <Text className="font-bold mb-4 lg:text-base  md:text-xs text-sm text-center md:text-start">
                    {elem?.title}
                  </Text>
                )}
                <div className="flex flex-col gap-y-2">
                  {elem?.data.map((data, idx) => (
                    <Link
                      key={idx}
                      className="align-baseline text-gray-dim lg:text-sm sm:text-xs text-center md:text-start"
                      href={`${data?.link}`}
                      passHref
                    >
                      {data?.text}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-col mt-6 md:mt-0 space-y-4 lg:max-w-xl self-center md:self-start sm:max-w-[200px]">
              <Text className="font-bold mb-4 lg:text-base md:text-xs text-sm text-center md:text-start">
                {t("join-newsletter")}
              </Text>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder={t("enter-email")}
                className="rounded-md text-gray-800 text-xs border border-gray-5"
              />
              <button
                type="submit"
                className="bg-black hover:bg-gray-900 text-white text-xs lg:text-base font-bold py-2 px-4 rounded-md"
              >
                {t("subscribe")}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-2 justify-center md:justify-normal">
            {SOCIAL_NETWORK.map((el) => (
                <a key={el.url} href={el.url} target="_blank">
                  <Image width={24} alt="social accounts" src={el.imgSrc} />
                </a>
            ))}
          </div>
        </PageContainer>
      </footer>
  );
};

export default Footer;
