"use client";
import { FC, useCallback, useState } from "react";
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
    <header className="bg-gray-100 fixed top-0 w-full z-40">
      <PageContainer>
        <nav
          className="mx-auto flex justify-between py-6 items-center px-2"
          aria-label="Global"
        >
          <div className="flex items-center">
            <Link href="/" passHref>
              <Image
                className="lg:mr-6"
                width={100}
                src={logo}
                alt="logo image"
              />
            </Link>
            <div className="hidden lg:flex lg:items-center lg:gap-x-4">
              {DATA().map((elem, index) => (
                <Link
                  key={elem.id}
                  href={elem.link}
                  passHref
                  onClick={() => handleLinkClick(index, elem.link)}
                  className={`text-sm font-semibold lg:text-xs xl:text-sm lg:mr-6 ${
                    activeTab === index ? "text-blue-royal" : "text-charcoal"
                  }`}
                >
                  {elem.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-x-3">
            {!isAuthenticated ? (
              <>
                <Link
                  href="/signin"
                  passHref
                  className="text-sm font-semibold text-black hidden lg:block"
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
            <div className="border-l h-8 hidden lg:block" />
            <SelectLanguage />
          </div>
        </nav>
      </PageContainer>
    </header>
  );
};

export default Header;
