import { FC } from "react";
import { useAuth } from "@/contexts/Auth";
import { SIDEBAR_SIZE } from "@/constants";
import LeftSidebar from "@/components/SideBar";
import { IMainContent } from "./type";
import { useSidebar } from "@/contexts/SideBar";

const MainContent: FC<IMainContent> = ({ children, className }) => {
  const { isAuthenticated } = useAuth() as any;
  const { isOpen } = useSidebar();

  return (
    <div
      className={`flex w-full mx-auto transition-all duration-300 ${className}`}
    >
      {isAuthenticated && <LeftSidebar />}
      <main
        className={`flex-grow pt-20 h-full ${
          isAuthenticated
            ? `pl-${SIDEBAR_SIZE} ${isOpen ? "ml-24" : "ml-0"}`
            : ""
        } transition-all duration-300`}
      >
        {children}
      </main>
    </div>
  );
};

export default MainContent;
