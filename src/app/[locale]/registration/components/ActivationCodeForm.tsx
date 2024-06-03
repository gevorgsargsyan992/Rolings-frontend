"use client";
import { FC, useState } from "react";
import Input from "@/components/Input";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import { VERIFICATION } from "@/apiConstants";
import useApi from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import {useAuth} from "@/contexts/Auth";

const { Text } = Typography;

const ActivationCode: FC<any> = ({ email, ...props }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const { setUser } = useAuth() as any;
  const router = useRouter();

  const api = useApi();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await onSend();
  };

  const onSend = async () => {
    try {
      // @ts-ignore
      const { id, access_token: token } = await api.patch(VERIFICATION, {
        verificationCode: +verificationCode,
        email,
      });

      if(token && id) {
        window.localStorage.setItem("token", token);
        await setUser(id);
        router.replace("/");
      }
    } catch (err) {
      throw new Error("Failed code resend");
    }
  };

  return (
    <div className="pt-20">
      <form onSubmit={handleSubmit} {...props}>
        <Input
          required
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          type="number"
          className="w-full bg-transparent"
          placeholder="Enter Code"
        />
        <Button type="ghost" className="w-full mt-6">
          Send
        </Button>
      </form>
      <div className="flex mt-10 justify-center align-middle">
        <Text level={6} className="mt-2">
          Did not get the code ?
        </Text>
        <Button onClick={onSend} type="text">
          Resend
        </Button>
      </div>
    </div>
  );
};

export default ActivationCode;
