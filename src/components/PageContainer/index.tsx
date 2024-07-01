import { FC } from "react";
import { IPageContainer } from "./types";

const PageContainer: FC<IPageContainer> = ({ children, className = "" }) => (
  <div className={`px-24 ${className}`}>{children}</div>
);

export default PageContainer;
