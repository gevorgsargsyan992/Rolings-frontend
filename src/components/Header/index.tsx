"use client";
import { FC, useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "@/components/Typography";
import logo from "../../../public/rolings-logo-white.svg";
import { DATA } from "./constants";
import SelectLanguage from "@/components/Select/SelectLanguage";
import { useAuth } from "@/contexts/Auth";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/contexts/SideBar";
import PageContainer from "../PageContainer";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

const Header: FC = () => {
  const { t } = useTranslation() as any;
  const router = useRouter();
  const { logout, isAuthenticated, getUserData } = useAuth() as any;
  const { setIsOpen, setActiveIndex, isOpen } = useSidebar();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<number | null>(null);

  const user = getUserData();

  const onLogout = useCallback(async () => {
    await logout();
    setIsOpen(false);
    setActiveIndex(-1);
    router.replace("/");
  }, [logout, router, setIsOpen, setActiveIndex]);

  const handleLinkClick = (index: number, link: string) => {
    setIsOpen(false);
    setActiveIndex(-1);
    setActiveTab(index);
    router.push(link);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const getUserInitials = useCallback(() => {
    if (!user || !user.companyName) return "NN";
    return `${user.companyName[0]}`;
  }, [user]);

  return (
    <header
      className="fixed top-0 w-full z-40 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/cover-image.png)" }}
    >
      <div className="absolute inset-0 bg-[#0f1729]/90" aria-hidden />
      <PageContainer className="relative z-10">
        <nav
          className="relative mx-auto flex justify-between py-6 items-center px-2"
          aria-label="Global"
        >
          <div className="flex items-center">
            <Link
              href="/"
              passHref
              onClick={() => setActiveTab(null)}
              className={`${isAuthenticated ? "pl-12 2xl:pl-0" : "pl-12 lg:pl-0 "}`}
            >
              <Image
                className="lg:mr-6"
                width={100}
                src={logo}
                alt="logo image"
              />
            </Link>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex lg:items-center lg:gap-x-4">
            {DATA().map((elem, index) => (
              <Link
                key={elem.id}
                href={elem.link}
                passHref
                onClick={() => handleLinkClick(index, elem.link)}
                className={`text-sm font-semibold lg:text-xs xl:text-sm lg:mr-6 hover:text-blue-400 ${
                  activeTab === index ? "text-blue-400" : "text-white"
                }`}
              >
                {elem.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-x-3">
            {!isAuthenticated ? (
              <>
                <Link
                  href="/signin"
                  passHref
                  className="text-sm font-semibold text-white hidden lg:block hover:text-blue-400"
                >
                  {t("signin")}
                </Link>
                <Link
                  className="bg-blue-royal rounded-full hidden lg:flex items-center justify-center px-2 py-1 lg:py-2 lg:px-3 md:px-2"
                  href="/registration"
                >
                  <Text className="pr-2 overflow-ellipsis" color="text-white">
                    {t("registration")}
                  </Text>
                  <Icon name="logout" />
                </Link>
              </>
            ) : (
              <div className="flex items-center">
                {user?.avatarImage ? (
                  <Image
                    src={user.avatarImage}
                    alt="User Avatar"
                    className="rounded-full h-10 w-10 object-cover"
                    width={40}
                    height={40}
                  />
                ) : (
                  <div className="bg-purple-900 text-white rounded-full h-10 w-10 flex items-center justify-center">
                    <span className="text-sm font-semibold">
                      {getUserInitials()}
                    </span>
                  </div>
                )}
                <Button onClick={onLogout} className="hidden lg:flex ml-4">
                  <Text
                    className="pr-2 overflow-ellipsis text-xs xl:text-base whitespace-nowrap"
                    color="text-white"
                  >
                    {t("logout")}
                  </Text>
                  <Icon name="logout" className="pr--2" />
                </Button>
              </div>
            )}
            <div className="border-l border-white/30 h-8 hidden lg:block" />
            <SelectLanguage />
          </div>
        </nav>
      </PageContainer>
    </header>
  );
};

export default Header;
