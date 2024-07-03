import React from "react";
import { IconProps } from "@/components/Icon/style";

const Icon: React.FC<IconProps> = ({
  name,
  className = "",
  color,
  size,
  ...props
}) => {
  return (
    <i
      className={`icon-${name} ${className}`}
      style={{ color, fontSize: size }}
      {...props}
    />
  );
};

export default Icon;
