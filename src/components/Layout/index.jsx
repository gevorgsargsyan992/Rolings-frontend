"use client";
import Header from "../Header";
import Footer from "../Footer";
import { useAuth } from "@/contexts/Auth";
import LeftSidebar from "@/components/SideBar";

const Layout = ({ children }) => {
  const { state } = useAuth();
  const { isAuthenticated } = state || {};

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      <Header />
      {isAuthenticated && <LeftSidebar />}
      <main className="flex-grow p-4 w-full max-w-5xl">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
