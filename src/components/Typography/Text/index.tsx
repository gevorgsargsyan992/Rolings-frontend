import React from "react";
import { TextProps } from "./types";

const Text: React.FC<TextProps> = ({
  bold = false,
  color = "text-gray-500",
  children,
  className = "text-base",
}) => {
  return (
    <p className={`${bold ? "font-bold" : ""} ${color} ${className}`}>
      {children}
    </p>
  );
};

export default Text;
