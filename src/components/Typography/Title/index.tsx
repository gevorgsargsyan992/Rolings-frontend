import  { FC } from "react";
import { TitleProps } from "./types";

const titleStyles: { [key: number]: string } = {
  1: "text-9xl",
  2: "text-8xl",
  3: "text-7xl",
  4: "text-6xl",
  5: "text-5xl",
};

const Title: FC<TitleProps> = ({
  level = 4,
  bold = false,
  color = "text-gray-500",
  children,
  className,
}) => {
  const textStyle = titleStyles[level] || titleStyles[4]; // Default to level 4 if out of range
  return (
    <p
      className={`${textStyle} ${
        bold ? "font-bold" : ""
      } ${color} ${className}`}>
      {children}
    </p>
  );
};

export default Title;
