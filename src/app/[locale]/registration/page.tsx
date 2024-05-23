import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "@/components/Typography";
import rolingsImg from "../../../../public/rolings.svg";
import logo from "../../../../public/rolings-logo.svg";
import SignUpForm from "./components/RegistrationForm";
import ActivationCode from "./components/ActivationCodeForm";

const { Text } = Typography;

const SignIn: FC = () => {
  return (
      <div className="flex">
        <div className="flex flex-4">
          <Image src={rolingsImg} alt="roling image"/>
        </div>
        <div className="flex flex-1 py-8 h-full flex-col align-middle justify-center text-center pl-12">
          <Image
              className="self-center mb-6"
              width={140}
              src={logo}
              alt="logo image"
          />
          <div className="py-4">
            <Text level={3} color="black" bold>
              Start earning with us!
            </Text>
          </div>
          <div className="flex justify-center mb-8">
            <Text level={5} bold>
              Do you have an account?
            </Text>
            <Link href="/signin" className="text-blue-500 text-bold pl-2 pt-0.5">
              Log in
            </Link>
          </div>
          <SignUpForm/>
        </div>
      </div>
  );
};

export default SignIn;
