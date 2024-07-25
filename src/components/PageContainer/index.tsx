import { FC } from "react";
import { IPageContainer } from "./types";

const PageContainer: FC<IPageContainer> = ({ children, className = "" }) => {
  const isAuthenticated =
    typeof window !== "undefined"
      ? !!window.localStorage.getItem("token")
      : false;

  return (
    <div className={`px-80 ${isAuthenticated ? "pr-12" : ""} ${className}`}>
      {children}
    </div>
  );
};

export default PageContainer;
