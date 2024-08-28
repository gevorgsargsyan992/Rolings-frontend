"use client";
import { FC, useState } from "react";
import Input from "@/components/Input";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import { VERIFICATION, VERIFICATION_RESEND } from "@/apiConstants";
import useApi from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/Auth";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

const ActivationCode: FC<any> = ({ email, password, ...props }) => {
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { login } = useAuth() as any;
  const router = useRouter();

  const { t } = useTranslation() as any;

  const api = useApi();
  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      // @ts-ignore
      const { id, access_token: token } = await api.patch(VERIFICATION, {
        verificationCode: +verificationCode,
        email,
      });

      if (token && id) {
        login(email, password);
        router.replace("/");
      }
    } catch (err) {
      setError(t("failed-code-resend"));
      throw new Error("Failed code send");
    }
    setLoading(false);
  };

  const onReSend = async () => {
    try {
      // @ts-ignore
      await api.patch(VERIFICATION_RESEND, {
        email,
      });
    } catch (err) {
      setError(t("failed-code-resend"));
      throw new Error("Failed code resend");
    }
  };

  return (
    <div className="pt-18">
      {error && <Text color="text-red-500 text-xs mb-2">{error}</Text>}
      <form onSubmit={handleSubmit} {...props}>
        <Input
          required
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          type="number"
          className="w-full bg-transparent"
          placeholder={t("enter-code")}
        />
        <Button loading={loading} type="ghost" className="w-full mt-6">
          Send
        </Button>
      </form>
      <div className="flex mt-10 justify-center align-middle">
        <Text className="mt-2">{t("company-name")}</Text>
        <Button onClick={onReSend} type="text">
          {t("did-not-get-code")}
        </Button>
      </div>
    </div>
  );
};

export default ActivationCode;
