import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "../../../components/Typography";
import rolingsImg from "../../../../public/rolings.svg";
import logo from "../../../../public/rolings-logo.svg";
import LoginForm from "./components/SignInForm";

const { Text } = Typography;

const SignIn: FC = () => {
  return (
    <div className="flex">
      <div className="flex flex-4">
        <Image src={rolingsImg} alt="roling image" />
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
            Welcome back to
          </Text>
          <Text level={3} color="black" bold>
            ROLINGS
          </Text>
        </div>
        <div className="flex justify-center mb-8">
          <Text level={5} bold>New user ?</Text>
          <Link href="/registration" className="text-blue-500 text-bold pl-2 pt-0.5">
            Create an account
          </Link>
        </div>
        <LoginForm />
        <Link className="mt-8" href="/forgot">
          Forgot password ?
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
