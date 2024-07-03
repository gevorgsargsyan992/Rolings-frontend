import React from "react";
import Text from "@/components/Typography/Text";
import "./index.css";

type PropTypes = {
  text: string;
  className?: string;
};

const Advantage = ({ text, className }: PropTypes) => {
  return (
    <div
      className={`bg-white container mt-2 md:mt-0 flex justify-center align-middle rounded w-[180px] h-[68px] self-center md:self-start ${className}`}
    >
      <Text
        className="self-center px-1 text-center text-xs md:text-sm xl:text-base lg:text-sm"
        color="text-black"
      >
        {text}
      </Text>
    </div>
  );
};

export default Advantage;
