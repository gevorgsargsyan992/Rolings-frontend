"use client";
import { FC, useState } from "react";
import Input from "@/components/Input";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import { RESTORE_PASSWORD } from "@/apiConstants";
import useApi from "@/hooks/useApi";
import { IForgotPasswordForm } from "@/app/[locale]/signin/components/types";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

const ForgotPasswordForm: FC<IForgotPasswordForm> = ({ email }) => {
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { t } = useTranslation() as any;

  const api = useApi();

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;
    if (!regex.test(password)) {
      setPasswordError(t("password-must-contain"));
      return false;
    }
    setPasswordError("");
    return true;
  };
  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    if (!validatePassword(password)) {
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(`Passwords don't match`);
      setLoading(false);
      return;
    } else {
      setConfirmPasswordError("");
    }

    try {
      const response = await api.patch(RESTORE_PASSWORD, {
        verificationCode: +verificationCode,
        password,
        email,
      });

      if (response?.success) {
        window.location.reload();
      }
    } catch (err) {
      setError(t("failed-reset-password"));
      setLoading(false);
      throw new Error("Failed to reset password");
    }
    setLoading(false);
  };

  return (
    <div className="pt-18">
      <div className="flex mb-6 justify-center align-middle">
        <Text className="mt-2">
          {t("check-email")} <span className="font-bold">{email}</span>
        </Text>
      </div>
      {error && (
        <Text color="text-red-500 text-xs pb-2 h-8 text-blue-500 border border-blu">
          {error}
        </Text>
      )}
      {passwordError && (
        <Text color="text-red-500 text-xs mb-5 h-8 text-blue-500 border border-blu">
          {passwordError}
        </Text>
      )}
      <form onSubmit={handleSubmit}>
        <Input
          required
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          type="number"
          className="w-full bg-transparent"
          placeholder={t("enter-code")}
        />
        <Input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          errorText={passwordError || confirmPasswordError}
          className="w-full mt-4 bg-transparent"
          placeholder={t("password")}
        />
        <Input
          type="confirmPassword"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          errorText={confirmPasswordError}
          className="w-full mt-4 bg-transparent"
          placeholder={t("confirm-password")}
        />
        <Button
          loading={loading}
          type="ghost"
          disable={!verificationCode || !password || !confirmPassword}
          className="w-full mt-6"
        >
          {t("confirm")}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
