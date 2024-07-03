"use client";
import { FC, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "@/components/Typography";
import logo from "../../../public/rolings-logo.svg";
import { DATA } from "./constants";
import SelectLanguage from "@/components/Select/SelectLanguage";
import { useAuth } from "@/contexts/Auth";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/contexts/SideBar";
import PageContainer from "../PageContainer";

const { Text } = Typography;

const Header: FC = () => {
  const router = useRouter();
  const { logout, isAuthenticated } = useAuth() as any;
  const { setIsOpen, setActiveIndex, isOpen } = useSidebar();

  const onLogout = useCallback(async () => {
    await logout();
    setIsOpen(false);
    setActiveIndex(-1); // Reset the active index
    router.replace("/");
  }, [logout, router, setIsOpen, setActiveIndex]);

  const handleLinkClick = (link: string) => {
    setIsOpen(false);
    setActiveIndex(-1); // Reset the active index
    router.push(link);
  };

  return (
    <header className="bg-gray-100 fixed top-0 w-full z-40">
      <PageContainer>
        <nav
          className={`mx-auto flex justify-between py-6 items-center px-2 ${
            isOpen ? "pr-24" : ""
          }`}
          aria-label="Global"
        >
          <div className="flex gap-x-2 md:gap-x-4 items-center">
            <Link href="/" passHref className="hidden lg:block">
              <Image
                className="lg:mr-6"
                width={100}
                src={logo}
                alt="logo image"
              />
            </Link>
            {DATA.map((elem) => (
              <Link
                key={elem.id}
                href={elem.link}
                passHref
                onClick={() => handleLinkClick(elem.link)}
                className="text-sm lg:mr-6 font-semibold text-charcoal"
              >
                {elem.name}
              </Link>
            ))}
          </div>
          <div className="flex gap-x-2 md:gap-x-4 items-center">
            {!isAuthenticated ? (
              <>
                <Link
                  href="/signin"
                  passHref
                  className="text-sm font-semibold leading-6 text-black mr-2"
                >
                  Sign In
                </Link>
                <Link
                  className="bg-blue-royal rounded-full flex items-center justify-center px-2 py-1 lg:py-2 lg:px-3 md:px-2"
                  href="/registration"
                >
                  <Text className="pr-2 overflow-ellipsis" color="text-white">
                    Registration
                  </Text>
                  <Icon name="logout" />
                </Link>
              </>
            ) : (
              <Button onClick={onLogout}>
                {" "}
                <Text className="pr-2 overflow-ellipsis" color="text-white">
                  Log Out
                </Text>{" "}
                <Icon name="logout" className="pr--2" />
              </Button>
            )}
            <div className="border-l h-8" />
            <SelectLanguage />
          </div>
        </nav>
      </PageContainer>
    </header>
  );
};

export default Header;
