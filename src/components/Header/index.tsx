"use client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "@/components/Typography";
import Select from "../Select";
import logo from "../../../public/logo.webp";
import { LANGUAGE_OPTIONS } from "../constants";

const { Text } = Typography;

const Header: FC = () => {
  return (
    <header className="bg-gray-100 w-full">
      <nav
        className="mx-auto flex justify-between p-6 lg:px-8 items-center"
        aria-label="Global"
      >
        <div className="flex lg:gap-x-12 items-center">
          <Link href="/" passHref>
            <Image
              className=""
              objectFit="contain"
              width={100}
              src={logo}
              alt="logo image"
            />
          </Link>
          <Link
            href="/"
            passHref
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Home
          </Link>
          <Link
            href="/offers"
            passHref
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Offers
          </Link>
          <Link
            href="/blog"
            passHref
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Blog
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-4 items-center">
          <Link
            href="/signin"
            passHref
            className="text-sm font-semibold leading-6 text-gray-900 mr-2"
          >
            Sign In
          </Link>
          <Link
            className="bg-blue-500 rounded-full flex items-center justify-center py-2 px-3"
            href="/registration"
          >
            <Text className="pr-2" color="text-white" level={6}>
              Registration
            </Text>
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
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
          </Link>
          <div className="border-l h-8" />
          <Select options={LANGUAGE_OPTIONS} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
