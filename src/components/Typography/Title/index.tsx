import React, { ReactNode } from "react";

interface TitleProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  bold?: boolean;
  children: ReactNode;
}

const titleStyles: { [key: number]: string } = {
  1: "text-4xl",
  2: "text-3xl",
  3: "text-2xl",
  4: "text-xl",
  5: "text-lg",
  6: "text-base",
};

const Title: React.FC<TitleProps> = ({ level = 4, bold = false, children }) => {
  const titleStyle = titleStyles[level] || titleStyles[4];
  return (
    <h1 className={`${titleStyle} ${bold ? "font-bold" : ""}`}>{children}</h1>
  );
};

export default Title;
