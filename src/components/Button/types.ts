import {MouseEvent, ReactNode} from "react";

export interface ButtonProps {
    type?: 'primary' | 'secondary' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    children?: ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}