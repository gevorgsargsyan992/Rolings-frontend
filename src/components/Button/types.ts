import { MouseEvent, ReactNode } from "react";

export interface ButtonProps {
  type?: string;
  size?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}
