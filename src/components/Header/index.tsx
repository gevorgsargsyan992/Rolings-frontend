import React from 'react';
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import Select from "../Select";
import logo from "../../assets/images/logo.svg";
import { LANGUAGE_OPTIONS } from "../constants";

const Header: React.FC = () => {
    return (
        <header className="bg-gray-100 w-full">
            <nav className="mx-auto flex justify-between p-6 lg:px-8 items-center" aria-label="Global">
                <div className="flex lg:gap-x-12 items-center">
                    <Link href="/" passHref>
                        <Image
                            className=""
                            objectFit="contain"
                            width={100}
                            src={logo}
                            alt="logo image"
                        />
                    </Link>
                    <Link href="/" passHref>
                        Home
                        {/*<a className="text-sm font-semibold leading-6 text-gray-900">Home</a>*/}
                    </Link>
                    <Link href="/offers" passHref>
                        Offers
                        {/*<a className="text-sm font-semibold leading-6 text-gray-900">Offers</a>*/}
                    </Link>
                    <Link href="/blog" passHref>
                        Blog
                        {/*<a className="text-sm font-semibold leading-6 text-gray-900">Blog</a>*/}
                    </Link>
                </div>
                <div className="hidden lg:flex lg:gap-x-4 items-center">
                    <Link href="/signin" passHref>
                        Sign In
                        {/*<a className="text-sm font-semibold leading-6 text-gray-900 mr-2">Sign In</a>*/}
                    </Link>
                    <Button
                        iconRight={
                            <svg
                                className="w-4 h-4 text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 16"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                                />
                            </svg>
                        }
                        onClick={() => {}}
                    >
                        Registration
                    </Button>
                    <div className="border-l h-8" />
                    <Select options={LANGUAGE_OPTIONS} />
                </div>
            </nav>
        </header>
    );
};

export default Header;
