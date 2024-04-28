"use client";
import React, { useMemo } from "react";
import { ButtonProps } from "./types";
import {SMALL, MEDIUM, LARGE, PRIMARY,SECONDARY, GHOST} from './consts'

const Button: React.FC<ButtonProps> = ({
  type = PRIMARY,
  size = MEDIUM,
  iconLeft,
  iconRight,
  children,
  onClick,
  className,
  ...props
}) => {
  const buttonSizeClass = useMemo(() => {
    switch (size) {
      case SMALL:
        return "px-3 py-1 text-sm";
      case MEDIUM:
        return "px-4 py-2 text-base";
      case LARGE:
        return "px-4 py-2 text-lg";
      default:
        return "px-4 py-2 text-lg";
    }
  }, [size]);

  const buttonTypeClass = useMemo(() => {
    switch (type) {
      case GHOST:
        return "border bg-transparent border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white";
      case SECONDARY:
        return "bg-gray-500 text-white focus:ring-gray-500";
      case PRIMARY:
        return "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500";

      default:
        return "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500";
    }
  }, [type]);

  return (
    <button
      className={`rounded-full flex items-center focus:outline-none focus:ring-2 py-2 px-4 justify-center ${buttonSizeClass} ${buttonTypeClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      {children}
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  );
};

export default Button;
