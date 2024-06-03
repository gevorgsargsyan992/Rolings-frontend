"use client";
import { FC, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { USER } from "@/apiConstants";
import useApi from "@/hooks/useApi";
// import {SignUpFormProps} from './types'

const SignUpForm: FC<any> = ({
  email,
  setEmail,
  setShowCodeFragment,
  ...props
}) => {
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const api = useApi();

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;
    if (!regex.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one symbol."
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      return;
    }

    // @ts-ignore
    const { success } =
      (await api.post(USER, {
        name,
        phoneNumber,
        password,
        email,
      })) || {};

    if (success) {
      setShowCodeFragment(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} {...props}>
      <Input
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full bg-transparent"
        placeholder="UserName"
      />
      <Input
        type="number"
        required
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="w-full bg-transparent mt-4"
        placeholder="Phone"
      />
      <Input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-transparent mt-4"
        placeholder="Email address"
      />
      <Input
        type="password"
        required
        value={password}
        showEyeIcon
        onChange={(e) => setPassword(e.target.value)}
        errorText={passwordError}
        className="w-full mt-4 bg-transparent"
        placeholder="Password"
      />
      <Button type="ghost" className="w-full mt-6">
        Sign In
      </Button>
    </form>
  );
};

export default SignUpForm;
