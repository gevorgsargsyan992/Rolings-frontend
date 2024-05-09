"use client";
import { FC, useState, useCallback } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { LoginFormProps } from "./types";
import {LOGIN} from '../../../apiConstants';
import useApi from "../../../hooks/useApi";

const LoginForm: FC<LoginFormProps> = ({ ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const api = useApi();

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        const token = await api.post(LOGIN, { email, remember: true, password });
        // api.setAuthToken(token);
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    [api, email, password]
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
