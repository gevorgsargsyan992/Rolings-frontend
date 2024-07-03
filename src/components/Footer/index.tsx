"use client";
import Typography from "@/components/Typography";
import Link from "next/link";
import Input from "@/components/Input";
import { DATA, INFO_DATA } from "./constants";
import { useState } from "react";
import LogoPart from "./components/LogoPart";
import PageContainer from "../PageContainer";
import Icon from "@/components/Icon";
const { Text } = Typography;

const Footer = () => {
  const [email, setEmail] = useState<string>("");

  return (
    <div>
      <LogoPart />
      <footer className="w-full bg-white 2xl:py-8 py-4">
        <PageContainer>
          <div className="flex md:flex-row w-full flex-col justify-center md:justify-between lg:gap-6 mx-auto max-w-5xl">
            <div className="flex flex-col gap-y-4">
              {INFO_DATA.map(({ iconName, text, id }) => (
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
            {DATA.map((elem, idx) => (
              <div className="flex flex-col mt-6 md:mt-0" key={idx}>
                {elem?.title && (
                  <Text className="font-bold mb-4 lg:text-base sm:text-sm text-center md:text-start">
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
              <Text className="font-bold mb-4 lg:text-base sm:text-sm text-center md:text-start">
                Join Our Newsletter
              </Text>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="rounded-md text-gray-800 border border-gray-5"
              />
              <button
                type="submit"
                className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-md"
              >
                Subscribe
              </button>
            </div>
          </div>
        </PageContainer>
      </footer>
    </div>
  );
};

export default Footer;
