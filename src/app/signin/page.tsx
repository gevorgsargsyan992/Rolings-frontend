import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "../../components/Typography";
import rolingsImg from "../../../public/rolings-big.webp";
import logo from "../../../public/logo.webp";
import LoginForm from "./components/form";

const { Text } = Typography;

const SignIn: FC = () => {
  return (
    <div className="flex">
      <div className="flex flex-4">
        <Image objectFit="contain" src={rolingsImg} alt="nice image" />
      </div>
      <div className="flex flex-1 flex-col align-middle justify-center text-center pl-12">
        <Image
          className="self-center"
          width={100}
          src={logo}
          alt="logo image"
        />
        <div className="py-4">
          <Text color="black" bold>
            Welcome back to
          </Text>
          <Text color="black" bold>
            ROLINGS
          </Text>
        </div>
        <div className="flex justify-center mb-8">
          <Text>New user ?</Text>
          <Link href="/registration" className="text-blue-500 pl-2 pt-0.5">
            Create an account
          </Link>
        </div>
        <LoginForm />
        <Link className="mt-8" href="forgot">
          Forgot password ?
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
