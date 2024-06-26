"use client";
import Header from "../Header";
import Footer from "../Footer";
import LeftSidebar from "@/components/SideBar";
import { useAuth } from "@/contexts/Auth";
import { SIDEBAR_SIZE } from "@/constants";
import { SidebarProvider } from "@/contexts/SideBar";

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <div className={`flex flex-1 w-full 2xl:px-60 xl:px-60 lg:px-80 px-40 mx-auto mt-20`}>
          {isAuthenticated && <LeftSidebar />}
          <main
            className={`flex-grow p-4 ${
              isAuthenticated ? `pl-${SIDEBAR_SIZE}` : ""
            }`}
          >
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default Layout;
