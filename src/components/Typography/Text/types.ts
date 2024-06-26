import {ReactNode} from "react";

export interface TextProps {
    bold?: boolean;
    children: ReactNode;
    color?: string;
    className?: string
}