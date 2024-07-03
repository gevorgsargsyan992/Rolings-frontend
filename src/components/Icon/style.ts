import { HTMLAttributes } from "react";

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
  className?: string;
  color?: string;
  size?: number;
}
