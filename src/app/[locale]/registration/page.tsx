"use client";
import React, { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "@/components/Typography";
import rolingsImg from "../../../../public/rolings.svg";
import logo from "../../../../public/rolings-logo.svg";
import SignUpForm from "./components/RegistrationForm";
import { useRouter } from "next/navigation";
import ActivationCodeForm from "@/app/[locale]/registration/components/ActivationCodeForm";
import Icon from "@/components/Icon";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

const Registration: FC = () => {
  const { t } = useTranslation() as any;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showCodeFragment, setShowCodeFragment] = useState<boolean>(false);
  const router = useRouter();
  const handleCloseModal = () => {
    setShowCodeFragment(false);
    router.replace("/");
  };

  return (
    <div className="fixed z-50 inset-0 bg-gray-800 bg-opacity-50">
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="2xl:w-[900px] xl:w-[860px] md:w-[720px] w-[356px]  h-[608px] flex mx-auto bg-gray-100 rounded-lg overflow-hidden relative">
          <button
            onClick={handleCloseModal}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <Icon name="close-full" size={20} />
          </button>
          <div className="flex flex-2 p-3  hidden md:flex">
            <Image className="w-full" src={rolingsImg} alt="roling image" />
          </div>
          <div className="flex flex-1 py-4 px-3 2xl:pt-4 md:pt-16 h-full flex-col align-middle justify-center text-center max-h-[608px] overflow-y-auto">
            <Image
              className="self-center mb-4 pt-20 lg:pt-40 md:pt-44"
              width={140}
              src={logo}
              alt="logo image"
            />
            {!showCodeFragment && (
              <>
                <div className="py-4">
                  <Text className="text-xl lg:text-2xl" color="text-black" bold>
                    {t("start-earning")}
                  </Text>
                </div>
                <div className="flex justify-center mb-8">
                  <Text className="text-sm md:text-xs lg:text-sm" bold>
                    {t("have-account")}
                    <Link
                      href="/signin"
                      className="text-sm md:text-xs lg:text-sm  text-blue-500 text-bold pl-2 pt-0.5"
                    >
                      {t("signin")}
                    </Link>
                  </Text>
                </div>
              </>
            )}
            {showCodeFragment ? (
              <ActivationCodeForm email={email} password={password} />
            ) : (
              <SignUpForm
                setShowCodeFragment={setShowCodeFragment}
                setEmail={setEmail}
                email={email}
                password={password}
                setPassword={setPassword}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
