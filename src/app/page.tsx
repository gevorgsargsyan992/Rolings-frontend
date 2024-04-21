import Image from "next/image";
import logo from "../../public/logo.svg";
import construction from "../../public/construction.svg";
import Layout from '../components/Layout'
import  Hero  from "@/components/Hero";

export default function Home() {
  return (
    <Layout>
      <Hero />
    {/* <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      <Image src={logo} width={260} alt="Under Construction"></Image>
      <Image src={construction} width={790} alt="Under Construction" />
      <p className=" text-xl text-gray-700 text-center">
        We currently working on this page. Please check back later!
      </p>
    </div> */}
    </Layout>
  );
}
