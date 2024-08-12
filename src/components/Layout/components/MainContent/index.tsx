import { FC } from "react";
import { useAuth } from "@/contexts/Auth";
import LeftSidebar from "@/components/SideBar";
import { IMainContent } from "./type";

const MainContent: FC<IMainContent> = ({ children, className }) => {
  const { isAuthenticated } = useAuth() as any;

  return (
    <div
      className={`flex w-full mx-auto transition-all duration-300 ${className}`}
    >
      <LeftSidebar />
      <main
        className="flex-grow flex flex-col justify-between pt-20 h-full"
      >
        {children}
      </main>
    </div>
  );
};

export default MainContent;
