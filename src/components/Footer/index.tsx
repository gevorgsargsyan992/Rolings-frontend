"use client";
// import Image from "next/image";
import logo from "../../../public/rolings-logo.svg";
import Typography from "@/components/Typography";
import Link from "next/link";
import Input from "@/components/Input";
import { DATA } from "./contsnts";
import { useState } from "react";
const { Text } = Typography;

const Footer = () => {
  const [email, setEmail] = useState<string>("");

  return (
    <>
      {/* TODO: uncomment this when homepage will be ready */}
      {/* <div className="max-w-5xl w-full py-8 bg-blue-grayish">
        <Image
          className="lg:mr-6"
          objectFit="contain"
          width={100}
          src={logo}
          alt="logo image"
        />
      </div> */}

      <footer className="w-full bg-white p-8">
        <div className="max-w-5xl mx-auto gap-6">
          <div className="flex w-full justify-between gap-2">
            <div className="flex flex-col gap-y-4">
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-dark self-center mr-1.5"
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
                <Text level={5}>Armenia / Yerevan, Abovyan 20</Text>
              </div>
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-dark self-center mr-1.5"
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
                <Text level={5}>info@rolings.am</Text>
              </div>
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-dark self-center mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5.75A4.75 4.75 0 017.75 1h8.5A4.75 4.75 0 0121 5.75v12.5A4.75 4.75 0 0116.25 23h-8.5A4.75 4.75 0 013 18.25V5.75z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 10c0 1.11-.895 2-2 2s-2-.89-2-2 .895-2 2-2 2 .89 2 2zM17 13v3"
                  />
                </svg>
                <Text level={5}>+374 44 410 002</Text>
              </div>
            </div>
            {DATA.map((elem, idx) => (
              <div className="flex flex-col" key={idx}>
                {elem?.title && (
                  <Text className="font-bold mb-4">{elem?.title}</Text>
                )}
                <div className="flex flex-col gap-y-1">
                  {elem?.data.map((data, idx) => (
                    <Link
                      key={idx}
                      className="align-baseline text-gray-dim"
                      href={`${data?.link}`}
                      passHref
                    >
                      {data?.text}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <Text className="font-bold mb-4">Join Our Newsletter</Text>
              <form className="flex flex-col space-y-4">
                <Input
                  value={email}
                  onChange={setEmail}
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
              </form>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
