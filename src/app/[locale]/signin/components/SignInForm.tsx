"use client";

import { FC, useState, useCallback } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { ILoginFormProps } from "./types";
import { useAuth } from "@/contexts/Auth";
import { useRouter } from "next/navigation";
import Typography from "@/components/Typography";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

const LoginForm: FC<ILoginFormProps> = ({ ...props }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const { t } = useTranslation() as any;

  const { login, loading } = useAuth() as any;

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        const isLoggedIn = await login(email, password);
        if (isLoggedIn) {
          router.replace("/");
        } else {
          setError("Something went wrong");
        }
      } catch (error) {
        setError("Something went wrong");
        console.error("Login failed:", error);
      }
    },
    [login, email, password, router]
  );

  return (
    <>
      {error && <Text color="text-red-500 mb-2">{error}</Text>}
      <form onSubmit={handleSubmit} {...props}>
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-transparent"
          placeholder={t("enter-email")}
        />
        <Input
          type="password"
          required
          showEyeIcon
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-4 bg-transparent"
          placeholder={t("password")}
        />
        <Button type="ghost" className="w-full mt-6" loading={loading}>
          {t("signin")}
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
