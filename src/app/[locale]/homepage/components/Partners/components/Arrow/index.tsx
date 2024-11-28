import Icon from "@/components/Icon";
import React from "react";

const Arrow = ({
  onClick,
  iconName = "arrow-left",
  className,
}: {
  onClick?: () => void;
  iconName?: string;
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={`absolute bg-opacity-50 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-md p-2 lg:p-4 hover:bg-gray-600 ${className}`}
  >
    <Icon name={iconName} size={14} />
  </button>
);

export default Arrow;
