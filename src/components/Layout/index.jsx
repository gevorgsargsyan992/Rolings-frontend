"use client";
import Header from "../Header";
import Footer from "../Footer";
import { SidebarProvider } from "@/contexts/SideBar";
import MainContent from "./components/MainContent";

const Layout = ({ children }) => (
  <SidebarProvider>
    <div className="h-full min-h-screen flex flex-col bg-gray-100">
      <MainContent className="flex-grow flex flex-col justify-between">
        <Header />
        {children}
        <Footer />
      </MainContent>
    </div>
  </SidebarProvider>
);

export default Layout;
