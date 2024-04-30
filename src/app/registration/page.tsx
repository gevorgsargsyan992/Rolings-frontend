import { FC } from "react";
import Image from "next/image";
import rolingsImg from "../../../public/rolings-big.webp";
import logo from "../../../public/logo.webp";
import LoginForm from "./components/form";

const SignIn: FC = () => {
    return (
        <div className="flex">
            <div className="flex flex-4">
                <Image objectFit="contain" src={rolingsImg} alt="nice image" />
            </div>
            <div className="flex flex-1 flex-col align-middle justify-center text-center pl-12">
                <Image
                    className="self-center mb-8"
                    width={100}
                    src={logo}
                    alt="logo image"
                />
                <LoginForm />
            </div>
        </div>
    );
};

export default SignIn;
