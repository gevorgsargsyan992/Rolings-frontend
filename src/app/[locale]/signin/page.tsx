"use client";
import React, { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "../../../components/Typography";
import rolingsImg from "../../../../public/rolings.svg";
import logo from "../../../../public/rolings-logo.svg";
import LoginForm from "./components/SignInForm";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import ForgotPassword from "@/app/[locale]/signin/components/EmailVerificationForm";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

const SignIn: FC = () => {
  const router = useRouter();
  const handleCloseModal = () => {
    router.replace("/");
  };

  const { t } = useTranslation() as any;

  const [showForgotPassSection, setShowForgotPassSection] = useState(false);

  return (
    <div className="fixed z-50 inset-0 bg-gray-800 bg-opacity-50">
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-[356px] md:w-[838px] h-[608px] flex mx-auto bg-gray-100 rounded-lg overflow-hidden relative">
          <button
            onClick={handleCloseModal}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <Icon name="close-full" size={20} />
          </button>
          <div className="flex-3 p-3 hidden md:flex">
            <Image className="w-full" src={rolingsImg} alt="roling image" />
          </div>
          <div className="flex flex-1 p-8 h-full flex-col align-middle justify-center text-center">
            <Image
              className="self-center mb-6"
              width={140}
              src={logo}
              alt="logo image"
            />
            {showForgotPassSection ? (
              <ForgotPassword />
            ) : (
              <div className="flex flex-col">
                <div className="py-4">
                  <Text className="text-xl lg:text-2xl" color="text-black" bold>
                    {t("welcome-back")}
                  </Text>
                  <Text className="text-xl lg:text-2xl" color="text-black" bold>
                    ROLINGS
                  </Text>
                </div>
                <div className="flex justify-center mb-8">
                  <Text className="text-sm" bold>
                    {t("new-user")}
                  </Text>
                  <Link
                    href="/registration"
                    className="text-sm text-blue-500 text-bold pl-2 pt-0.5"
                  >
                    {t("create-account")}
                  </Link>
                </div>
                <LoginForm />
                <Button
                  type="text"
                  className="mt-8 text-gray-500"
                  onClick={() => setShowForgotPassSection(true)}
                >
                  {t("forgot-password")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
