import {ReactNode} from "react";

export interface TextProps {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    bold?: boolean;
    children: ReactNode;
    color?: string;
    className?: string
}