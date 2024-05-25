"use client";
import Header from "../Header";
import Footer from "../Footer";
import { useAuth } from "@/contexts/Auth";
import LeftSidebar from "@/components/SideBar";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const { state } = useAuth();
  const router = useRouter();
  const { isAuthenticated } = state || {};

  const hideHeaderFooter =
    router.pathname === "/signin" || router.pathname === "/register"; //TODO: fix this 

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {!hideHeaderFooter && <Header />}
      <div className="flex flex-1 w-full max-w-5xl mx-auto mt-20">
        {isAuthenticated && <LeftSidebar />}
        <main className="flex-grow p-4">{children}</main>
      </div>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

export default Layout;
