import  { ReactNode } from "react";

export interface TitleProps  {
    level?: 1 | 2 | 3 | 4 | 5;
    bold?: boolean;
    children: ReactNode;
    color?: string;
    className?: string
}
