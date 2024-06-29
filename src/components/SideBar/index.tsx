"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Typography from "../Typography";
import { DATA } from "./constants";
import { useSidebar } from "@/contexts/SideBar";

const { Text } = Typography;

const LeftSidebar: FC = () => {
  const router = useRouter();
  const { activeIndex, setActiveIndex, isOpen, setIsOpen } = useSidebar();

  const handleClick = (index: number, link: string) => {
    setActiveIndex(index);
    router.push(link);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full z-50 flex transition-width duration-300 ease-in-out ${
        isOpen ? "w-48" : "w-12"
      }`}
    >
      <div
        className={`bg-gray-800 text-white transition-all duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } pt-6 h-full relative`}
      >
        <button
          onClick={toggleSidebar}
          className={`absolute top-2 right-2 ${isOpen ? "" : "hidden"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col mt-4 w-full">
          {DATA.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              onClick={() => handleClick(index, item.link)}
              className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-700 ${
                index === activeIndex ? "bg-gray-700" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5 mr-2"
              >
                {item.iconPath}
              </svg>
              <Text className="text-lg" color="text-white">
                {item.title}
              </Text>
            </Link>
          ))}
        </div>
      </div>
      <button
        onClick={toggleSidebar}
        className={`flex justify-center bg-gray-800 text-white w-16 absolute left-0 h-full pt-4 ${
          isOpen ? "hidden" : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </div>
  );
};

export default LeftSidebar;
