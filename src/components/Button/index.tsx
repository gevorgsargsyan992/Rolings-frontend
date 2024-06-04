"use client";
import React, { useMemo } from "react";
import { ButtonProps } from "./types";
import {
  SMALL,
  MEDIUM,
  LARGE,
  PRIMARY,
  SECONDARY,
  GHOST,
  TEXT,
} from "./consts";

const Button: React.FC<ButtonProps> = ({
  type = PRIMARY,
  size = MEDIUM,
  iconLeft,
  iconRight,
  children,
  onClick,
  className,
  loading,
  disable,
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
        return "border bg-transparent border-blue-royal text-black hover:bg-blue-royal hover:text-white";
      case SECONDARY:
        return "bg-gray-500  border-gray-500 text-white focus:ring-gray-500";
      case PRIMARY:
        return "bg-blue-royal hover:bg-blue-600 text-white focus:ring-blue-royal";
      case TEXT:
        return "bg-transparent focus:ring-0 focus:border-none border-none text-blue-500 hover:text-blue-700";

      default:
        return "bg-blue-royal border-blue-royal hover:bg-blue-600 text-white focus:ring-blue-royal";
    }
  }, [type]);

  return (
    <button
      className={`rounded-full flex items-center focus:outline-none focus:ring-2 py-2 px-4 justify-center ${buttonSizeClass} ${buttonTypeClass} ${className}`}
      onClick={onClick}
      disabled={disable}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        <>
          {iconLeft && <span className="mr-2">{iconLeft}</span>}
          {children}
          {iconRight && <span className="ml-2">{iconRight}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
