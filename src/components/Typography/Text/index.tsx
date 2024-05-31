import React, { ReactNode } from "react";
import { TextProps } from "./types";

const textStyles: { [key: number]: string } = {
  1: "text-4xl",
  2: "text-3xl",
  3: "text-2xl",
  4: "text-xl",
  5: "text-lg",
  6: "text-base",
};

const Text: React.FC<TextProps> = ({
  level = 4,
  bold = false,
  color = "gray-500",
  children,
  className,
}) => {
  const textStyle = textStyles[level] || textStyles[4]; // Default to level 4 if out of range
  return (
    <p className={`${textStyle} ${bold ? "font-bold" : ""} ${color} ${className}`}>
      {children}
    </p>
  );
};

export default Text;
