"use client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "../../../components/Typography";
import rolingsImg from "../../../../public/rolings.svg";
import logo from "../../../../public/rolings-logo.svg";
import LoginForm from "./components/SignInForm";
import { useRouter } from "next/navigation";

const { Text } = Typography;

const SignIn: FC = () => {
  const router = useRouter();
  const handleCloseModal = () => {
    router.replace("/");
  };

  return (
    <div className="fixed z-10 inset-0 bg-gray-800 bg-opacity-50">
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-[838px] h-[608px] flex mx-auto bg-gray-100 rounded-lg overflow-hidden relative">
          <button
            onClick={handleCloseModal}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
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
          <div className="flex flex-3 p-3">
            <Image
                className="w-full"
                src={rolingsImg}
                alt="roling image"
                objectFit="cover"
            />
          </div>
          <div className="flex flex-1 p-8 h-full flex-col align-middle justify-center text-center">
            <Image
              className="self-center mb-6"
              width={140}
              src={logo}
              alt="logo image"
            />
            <div className="py-4">
              <Text level={3} color="text-black" bold>
                Welcome back to
              </Text>
              <Text level={3} color="text-black" bold>
                ROLINGS
              </Text>
            </div>
            <div className="flex justify-center mb-8">
              <Text level={5} bold>
                New user ?
              </Text>
              <Link
                href="/registration"
                className="text-blue-500 text-bold pl-2 pt-0.5"
              >
                Create an account
              </Link>
            </div>
            <LoginForm />
            <Link className="mt-8 text-gray-500" href="/forgot">
              Forgot password ?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
