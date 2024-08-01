import { FC } from "react";
import { IPageContainer } from "./types";

const PageContainer: FC<IPageContainer> = ({ children, className = "" }) => (
  <div className={`px-20 md:px-40 2xl:px-80 ${className}`}>{children}</div>
);

export default PageContainer;
