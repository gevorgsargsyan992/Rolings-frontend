"use client";

import { FC, useState, useCallback } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { LoginFormProps } from "./types";
import { useAuth } from "@/contexts/Auth";
import { useRouter } from "next/navigation";

const LoginForm: FC<LoginFormProps> = ({ ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { login } = useAuth() as any;

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        console.log("calledddd");
        await login(email, password);
        router.replace("/");
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    [login, email, password, router]
  );

  return (
    <form onSubmit={handleSubmit} {...props}>
      <Input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-transparent"
        placeholder="Email address"
      />
      <Input
        type="password"
        required
        showEyeIcon
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mt-4 bg-transparent"
        placeholder="Password"
      />
      <Button type="ghost" className="w-full mt-6">
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
