"use client";
import React, { FC, useCallback, useState } from "react";
import Input from "@/components/Input";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import { RESTORE_PASSWORD } from "@/apiConstants";
import useApi from "@/hooks/useApi";
import ForgotPasswordForm from "@/app/[locale]/signin/components/ForgotPasswordForm";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

interface SuccessResponse {
  success: boolean;
  // other properties if available
}

const EmailVerificationForm = ({ ...props }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [showForgotPasswordForm, setShowForgotPasswordForm] =
    useState<boolean>(false);

  const { t } = useTranslation() as any;

  const api = useApi();

  const handleSubmit = useCallback(
    async (e: any) => {
      setLoading(true);
      e.preventDefault();
      try {
        const response = await api.post(
          `${RESTORE_PASSWORD}/verify-email`,
          {
            email,
          }
        ) as SuccessResponse;

        if (response?.success) {
          setShowForgotPasswordForm(true);
        }
      } catch (err) {
        setError(t("email-verification-failed"));
        setLoading(false);
        throw new Error("Failed email verification");
      }
      setLoading(false);
    },
    [api, email, t]
  );

  return (
    <>
      {showForgotPasswordForm ? (
        <ForgotPasswordForm email={email} />
      ) : (
        <div className="pt-18">
          {error && <Text color="text-red-500 text-xs mb-2">{error}</Text>}
          <form onSubmit={handleSubmit} {...props}>
            <Input
              required
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent"
              placeholder={t("enter-email")}
            />
            <Button
              loading={loading}
              disable={!email}
              type="ghost"
              className="w-full mt-6">
              {t("next")}
            </Button>
          </form>
        </div>
      )}
      <div className="flex mt-8">
        <Text>
          {t("remembered-password")}{" "}
          <a className="text-blue-500 ml-2" href="/signin">
            {t("sign-in")}
          </a>
        </Text>
      </div>
    </>
  );
};

export default EmailVerificationForm;
