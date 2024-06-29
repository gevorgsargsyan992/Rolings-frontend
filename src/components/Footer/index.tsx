"use client";
import Typography from "@/components/Typography";
import Link from "next/link";
import Input from "@/components/Input";
import { DATA } from "./constants";
import { useState } from "react";
import LogoPart from "./components/LogoPart";
import PageContainer from "../PageContainer";
const { Text } = Typography;

const Footer = () => {
  const [email, setEmail] = useState<string>("");

  return (
    <>
      <LogoPart />
      <footer className="w-full bg-white 2xl:py-8 py-4">
        <PageContainer>
          <div className="flex w-full justify-between lg:gap-6 mx-auto max-w-5xl">
            <div className="flex flex-col gap-y-4">
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-dark self-center mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM12 3c-3.178 0-6 2.822-6 6 0 5.25 6 12 6 12s6-6.75 6-12c0-3.178-2.822-6-6-6z"
                  />
                </svg>
                <Text>Armenia / Yerevan, Abovyan 20</Text>
              </div>
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-dark self-center mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12h4a2 2 0 002-2V8a2 2 0 00-2-2H4a2 2 0 00-2 2v2a2 2 0 002 2h4m-6 0v6a2 2 0 002 2h16a2 2 0 002-2v-6m-8 6l-6-6"
                  />
                </svg>
                <Text>info@rolings.am</Text>
              </div>
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-dark self-center mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5.75A4.75 4.75 0 017.75 1h8.5A4.75 4.75 0 0121 5.75v12.5A4.75 4.75 0 0116.25 23h-8.5A4.75 4.75 0 013 18.25V5.75z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 10c0 1.11-.895 2-2 2s-2-.89-2-2 .895-2 2-2 2 .89 2 2zM17 13v3"
                  />
                </svg>
                <Text>+374 44 410 002</Text>
              </div>
            </div>
            {DATA.map((elem, idx) => (
              <div className="flex flex-col" key={idx}>
                {elem?.title && (
                  <Text className="font-bold mb-4">{elem?.title}</Text>
                )}
                <div className="flex flex-col gap-y-2">
                  {elem?.data.map((data, idx) => (
                    <Link
                      key={idx}
                      className="align-baseline text-gray-dim text-sm"
                      href={`${data?.link}`}
                      passHref
                    >
                      {data?.text}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-col space-y-4">
              <Text className="font-bold mb-4">Join Our Newsletter</Text>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md text-gray-800 border border-gray-5"
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
    </>
  );
};

export default Footer;
