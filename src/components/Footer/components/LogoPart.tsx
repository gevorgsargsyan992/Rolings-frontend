import { FC } from "react";
import Image from "next/image";
import logo from "../../../../public/rolings-logo.svg";
import PageContainer from "@/components/PageContainer";

const LogoPart: FC = () => (
  <PageContainer className="w-full py-8 bg-blue-grayish">
    <div className="mx-auto flex justify-center md:justify-normal max-w-5xl">
      <Image className="lg:mr-6" width={100} src={logo} alt="logo image" />
    </div>
  </PageContainer>
);

export default LogoPart;
