"use client";
import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "@/components/Typography";
import rolingsImg from "../../../../public/rolings.svg";
import logo from "../../../../public/rolings-logo.svg";
import SignUpForm from "./components/RegistrationForm";
import { useRouter } from "next/navigation";
import ActivationCodeForm from "@/app/[locale]/registration/components/ActivationCodeForm";

const { Text } = Typography;

const Registration: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showCodeFragment, setShowCodeFragment] = useState<boolean>(false);
  const router = useRouter();
  const handleCloseModal = () => {
    setShowCodeFragment(false);
    router.replace("/");
  };

  return (
    <div className="fixed z-10 inset-0 bg-gray-800 bg-opacity-50">
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="2xl:w-[900px] xl:w-[860px] md:w-[720px] 2xl:h-[608px] h-[500px] flex mx-auto bg-gray-100 rounded-lg overflow-hidden relative">
          <button
            onClick={handleCloseModal}
            className="absolute z-50 focus:outline-none top-1.5 2xl:top-2 2xl:right-4 right-1.5 text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="flex flex-2 p-3">
            <Image
              className="w-full"
              src={rolingsImg}
              alt="roling image"
              objectFit="cover"
            />
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
                  <Text className="text-2xl" color="text-black" bold>
                    Start earning with us!
                  </Text>
                </div>
                <div className="flex justify-center mb-8">
                  <Text className="text-lg" bold>
                    Do you have an account?
                  </Text>
                  <Link
                    href="/signin"
                    className="text-blue-500 text-bold pl-2 pt-0.5"
                  >
                    Log in
                  </Link>
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
