import {MouseEvent, ReactNode} from "react";

export interface ButtonProps {
    type?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    children?: ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}