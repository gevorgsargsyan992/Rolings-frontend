"use client";
import Image from "next/image";
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
      <div className="max-w-5xl w-full py-8 bg-blue-grayish">
        <Image
          className="lg:mr-6"
          objectFit="contain"
          width={100}
          src={logo}
          alt="logo image"
        />
      </div>

      <footer className="w-full bg-white p-8">
        <div className="max-w-5xl mx-auto gap-6">
          <div className="flex w-full justify-between gap-2">
            <div className="flex flex-col gap-y-4">
              <div>
                <svg
                  className="w-6 h-6 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <Text level={5}>Armenia / Yerevan, Abovyan 20</Text>
              </div>

              <Text level={5}>info@rolings.am</Text>
              <Text level={5}>+374 44 410 002</Text>
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
