import Header from "../Header";
import Footer from "../Footer";

const Layout = ({ children }) => {
  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center bg-gray-100"
    >
      <Header />
      <main className="flex-grow p-4 w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
