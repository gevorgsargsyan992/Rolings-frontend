"use client";
import { FC, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
// import {SignUpFormProps} from './types'

const SignUpForm:FC<any> = ({ ...props }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        //TODO: Add sign up logic here
    };

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
            <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-4 bg-transparent"
                placeholder="Confirm Password"
            />
            <Button
                type="ghost"
                className="w-full mt-6"
            >
                Sign In
            </Button>
        </form>
    );
};

export default SignUpForm;
