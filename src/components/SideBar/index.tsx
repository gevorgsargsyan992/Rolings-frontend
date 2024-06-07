"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Typography from "../Typography";
import { DATA } from "./constants";

const { Text } = Typography;

const LeftSidebar: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="fixed left-0 top-0 bg-gray-800 text-white h-full mt-20 w-48">
      <div className="mt-4">
        {DATA.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            onClick={() => handleClick(index)}
            className={`flex items-center mt-3 px-4 py-2 cursor-pointer hover:bg-gray-700 ${
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
            <Text level={5} color="text-white">
              {item.title}
            </Text>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
