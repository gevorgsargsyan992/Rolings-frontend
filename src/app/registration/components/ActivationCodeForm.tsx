"use client";
import { FC, useState } from "react";
import Input from "@/components/Input";
import Typography from "@/components/Typography";
import Button from "@/components/Button";

const { Text } = Typography;

const ActivationCode: FC<any> = ({ ...props }) => {
  const [code, setCode] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //TODO: Add logic here
  };

  return (
    <>
      <form onSubmit={handleSubmit} {...props}>
        <Input
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full bg-transparent"
          placeholder="Enter Code"
        />
        <Button type="ghost" className="w-full mt-6">
          Send
        </Button>
      </form>
      <div className="flex mt-10 justify-center align-middle">
        <Text level={6} className="mr-2">Did not get the code ?</Text>
        <Button type="text">Resend</Button>
      </div>
    </>
  );
};

export default ActivationCode;
