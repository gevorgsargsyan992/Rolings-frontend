"use client";
import { FC, useState } from "react";
import Link from "next/link";
import Input from "@/components/Input";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import { USER } from "@/apiConstants";
import useApi from "@/hooks/useApi";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

const SignUpForm: FC<any> = ({
  email,
  setEmail,
  setShowCodeFragment,
  password,
  setPassword,
  ...props
}) => {
  const [companyName, setCompanyName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

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
    e.preventDefault();
    setLoading(true);

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
      // @ts-ignore
      const { success } =
        (await api.post(USER, {
          name,
          phoneNumber,
          password,
          companyName,
          email,
        })) || {};

      if (success) {
        setShowCodeFragment(true);
      }
    } catch (err) {
      setLoading(false);
      // @ts-ignore
      setError(err?.response?.data?.message || "Something went wrong");
      throw new Error("Failed code resend");
    }

    setLoading(false);
  };

  const onRestorePassword = () => {
    //TODO: make server request
  };

  const handleRadioClick = () => {
    setChecked(true);
  };

  return (
    <>
      {error && <Text color="text-red-500 mb-2">{error}</Text>}
      {passwordError && <Text color="text-red-500 mb-2">{passwordError}</Text>}
      {confirmPasswordError && (
        <Text color="text-red-500 text-xs mb-2">{confirmPasswordError}</Text>
      )}
      <form onSubmit={handleSubmit} {...props}>
        <Input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-transparent"
          placeholder={t("username")}
        />
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-transparent mt-4"
          placeholder={t("email")}
        />
        <Input
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full bg-transparent mt-4"
          placeholder={t("company-name")}
        />
        <Input
          type="number"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full bg-transparent mt-4"
          placeholder={t("phone")}
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
        <label className="flex items-center mt-4">
          <input
            type="radio"
            checked={checked}
            onChange={handleRadioClick}
            required
            className="form-radio text-indigo-600"
          />
          <Text color="text-gray-dark" className="text-xs  pl-2">
            {t("agree-terms")}{" "}
            <Link className="underline text-xs" href="/">
              {t("terms-of-service")}
            </Link>
          </Text>
        </label>
        <Button
          loading={loading}
          disable={
            loading ||
            !checked ||
            !name ||
            !email ||
            !phoneNumber ||
            !password ||
            !confirmPassword ||
            !companyName
          }
          type="ghost"
          className="w-full mt-6"
        >
          {t("resgister-now")}
        </Button>
      </form>
    </>
  );
};

export default SignUpForm;
