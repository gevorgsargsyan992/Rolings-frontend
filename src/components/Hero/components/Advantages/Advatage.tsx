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
      className={`px-6 bg-white container flex justify-center align-middle rounded ${className}`}
    >
      <Text className="self-center text-center" level={6} color="text-black">
        {text}
      </Text>
    </div>
  );
};

export default Advantage;
