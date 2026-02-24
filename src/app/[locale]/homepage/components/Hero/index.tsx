"use client";
import { FC } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Typography from "@/components/Typography";
import Advantages from "./components/Advantages";
import PageContainer from "@/components/PageContainer";
import Button from "@/components/Button";
import Link from "next/link";

const { Text } = Typography;

const Hero: FC = () => {
  const { t } = useTranslation() as any;

  return (
    <>
      <section
        className="relative w-full min-h-[90vh] flex items-center bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: "url(/cover-image.png)" }}>
        <div className="absolute inset-0 bg-[#0f1729]/80 " aria-hidden />
        <PageContainer className="relative w-full z-10 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row w-full items-center gap-10 lg:gap-12">
            <div className="flex flex-1 flex-col text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 text-white px-4 py-2 text-sm w-fit mx-auto lg:mx-0 mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                {t("stay-focused")}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                {t("first-interactive")}
                <br />
                <span className="text-blue-400">{t("advertisement")}</span>
                <br />
                {t("in-armenia")}
              </h1>
              <Text className="mt-4 text-white/90 text-base lg:text-lg max-w-xl mx-auto lg:mx-0">
                {t("advatages-our-network")}
              </Text>
              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
                <Link href="/registration" passHref>
                  <Button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white border-0 rounded-full px-6 py-3">
                    {t("get-started")} →
                  </Button>
                </Link>
                <Button
                  type="ghost"
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 rounded-full px-6 py-3">
                  <span className="mr-2">▷</span>
                  {t("watch-demo")}
                </Button>
              </div>
            </div>
            <div className="flex flex-1 w-full min-w-0 max-w-2xl order-1 lg:order-2 lg:min-w-[400px]">
              <div
                className="relative w-full h-[280px] sm:h-[340px] lg:h-[480px] rounded-xl overflow-hidden
  ring-1 ring-white/40
  shadow-[0_0_25px_rgba(255,255,255,0.45)]">
                <Image
                  src="/hero-main-2.jpg"
                  alt="Interactive taxi advertising"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                />
              </div>
            </div>
          </div>
        </PageContainer>
      </section>
      <Advantages />
    </>
  );
};

export default Hero;
