"use client";
import Header from "../Header";
import Footer from "../Footer";
import LeftSidebar from "@/components/SideBar";
import { useAuth } from "@/contexts/Auth";

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex flex-1 w-full px-12 mx-auto mt-20">
        {isAuthenticated && <LeftSidebar />}
        <main className={`flex-grow p-4 ${isAuthenticated ? "pl-48" : ""}`}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
