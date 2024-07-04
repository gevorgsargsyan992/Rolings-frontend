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

const { Text } = Typography;

const Header: FC = () => {
  const router = useRouter();
  const { logout, isAuthenticated } = useAuth() as any;
  const { setIsOpen, setActiveIndex, isOpen } = useSidebar();
  const [menuOpen, setMenuOpen] = useState(false);

  const onLogout = useCallback(async () => {
    await logout();
    setIsOpen(false);
    setActiveIndex(-1);
    router.replace("/");
  }, [logout, router, setIsOpen, setActiveIndex]);

  const handleLinkClick = (link: string) => {
    setIsOpen(false);
    setActiveIndex(-1);
    router.push(link);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-gray-100 fixed top-0 w-full z-40">
      <PageContainer>
        <nav
          className={`mx-auto flex justify-center md:justify-between py-6 items-center px-2 ${
            isOpen ? "pr-12" : "pr-2"
          }`}
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
              {DATA.map((elem) => (
                <Link
                  key={elem.id}
                  href={elem.link}
                  passHref
                  onClick={() => handleLinkClick(elem.link)}
                  className="text-sm font-semibold text-charcoal lg:mr-6"
                >
                  {elem.name}
                </Link>
              ))}
            </div>
          </div>
          <div
            className={`absolute top-8 right-6 lg:hidden ${
              isOpen ? "right-28" : ""
            }`}
          >
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
              onClick={toggleMenu}
            >
              <Icon name="menu" color="text-white" size={20} />
            </button>
          </div>
          <div className="flex items-center gap-x-2">
            {!isAuthenticated ? (
              <>
                <Link
                  href="/signin"
                  passHref
                  className="text-sm font-semibold leading-6 text-black hidden lg:block"
                >
                  Sign In
                </Link>
                <Link
                  className="bg-blue-royal rounded-full hidden lg:flex items-center justify-center px-2 py-1 lg:py-2 lg:px-3 md:px-2"
                  href="/registration"
                >
                  <Text className="pr-2 overflow-ellipsis" color="text-white">
                    Registration
                  </Text>
                  <Icon name="logout" />
                </Link>
              </>
            ) : (
              <Button onClick={onLogout} className="hidden lg:flex">
                <Text className="pr-2 overflow-ellipsis" color="text-white">
                  Log Out
                </Text>
                <Icon name="logout" className="pr--2" />
              </Button>
            )}
            <div className="border-l h-8 hidden lg:block" />
            <SelectLanguage className="hidden lg:block" />
          </div>
          <div
            className={`fixed top-0 right-0 h-full bg-white transition-transform transform ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            } lg:relative lg:translate-x-0 lg:hidden w-[180px]`}
          >
            {menuOpen && (
              <div className="flex justify-end p-4">
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                  onClick={toggleMenu}
                >
                  <Icon name="close" color="text-white" size={12} />
                </button>
              </div>
            )}
            <div className="flex flex-col items-center gap-2 lg:gap-0">
              {DATA.map((elem) => (
                <Link
                  key={elem.id}
                  href={elem.link}
                  passHref
                  onClick={() => handleLinkClick(elem.link)}
                  className="text-sm font-semibold text-charcoal mt-2"
                >
                  {elem.name}
                </Link>
              ))}
              {!isAuthenticated ? (
                <>
                  <Link
                    href="/signin"
                    passHref
                    className="text-sm font-semibold leading-6 text-black mt-2"
                  >
                    Sign In
                  </Link>
                  <Link
                    className="lg:bg-blue-royal lg:rounded-full mt-2 flex items-center justify-center px-2 py-1"
                    href="/registration"
                  >
                    <Text className="pr-2 overflow-ellipsis text-sm font-semibold" color="lg:text-white text-charcoal">
                      Registration
                    </Text>
                  </Link>
                </>
              ) : (
                <div onClick={logout}>
                  <Text className="text-sm font-semibold" color="text-charcoal">
                    Log Out
                  </Text>
                </div>
              )}
              <SelectLanguage className="mt-2" />
            </div>
          </div>
        </nav>
      </PageContainer>
    </header>
  );
};

export default Header;
