import { FC } from "react";
import { IPageContainer } from "./types";

const PageContainer: FC<IPageContainer> = ({ children, className = "" }) => (
  <div className={`px-20 2xl:px-40 ${className}`}>{children}</div>
);

export default PageContainer;
