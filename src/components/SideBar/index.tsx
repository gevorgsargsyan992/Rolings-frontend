"use client";

import { FC, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Typography from "../Typography";
// import { DATA } from "./content";
import AuthContext from "@/contexts/Auth";
import { useSidebar } from "@/contexts/SideBar";
import Icon from "@/components/Icon";
import {UserType} from "@/types/UserTypes";
import {useTranslation} from "react-i18next";

const { Text } = Typography;

const LeftSidebar: FC = () => {
  const router = useRouter();
  const { activeIndex, setActiveIndex, isOpen, setIsOpen } = useSidebar();
  const { getUserData } = useContext(AuthContext) as any;
  const userData = getUserData();
  const {t} = useTranslation() as any;

  const handleClick = (index: number, link: string) => {
    setActiveIndex(index);
    router.push(link);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const DATA = (userType) =>{
    return [
      {
        link: "/tablet",
        title: t('tablets'),
        iconName: "tablet",
        isVisible: userType === UserType.SUPER_ADMIN,
      },
      {
        link: "/videos",
        title: t('videos'),
        iconName: "video",
        isVisible: userType === UserType.SUPER_ADMIN,
      },
      {
        link: "/users",
        title: t('users'),
        iconName: "users",
        isVisible: userType === UserType.SUPER_ADMIN,
      },
      {
        link: "/email-stats",
        title: t('email-stats'),
        iconName: "email",
        isVisible: userType === UserType.SUPER_ADMIN,
      },
      {
        link: "/monitoring",
        title: t('monitoring'),
        iconName: "monitoring",
        isVisible:
            userType === UserType.SUPER_ADMIN || userType === UserType.SELLER,
      },
      {
        link: "/questionnaire",
        title: t('questionnaire'),
        iconName: "forum",
        isVisible:
            userType === UserType.SUPER_ADMIN || userType === UserType.SELLER,
      },
    ]
  }

  return (
    <div
      className={`fixed top-0 left-0 h-full z-50 flex transition-width duration-300 ease-in-out`}
    >
      <div
        className={`bg-gray-800 text-white transition-all duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } pt-6 h-full relative`}
      >
        <button
          onClick={toggleSidebar}
          className={`absolute top-2 right-2 ${isOpen ? "" : "hidden"}`}
        >
          <Icon name="close" color="text-white" size={12} />
        </button>
        <div className="flex flex-col mt-4 w-full">
          {DATA(userData?.type).map((item, index) => (
            <Link
              key={index}
              href={item.link}
              onClick={() => handleClick(index, item.link)}
              className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-700 ${
                item.isVisible ? "" : "hidden"
              } ${index === activeIndex ? "bg-gray-700" : ""}`}
            >
              <Icon name={item.iconName} className="mr-2" />
              <Text className="md:text-sm lg:text-lg" color="text-white">
                {item.title}
              </Text>
            </Link>
          ))}
        </div>
      </div>
      <button
        onClick={toggleSidebar}
        className={`flex justify-center bg-gray-800 text-white w-16 absolute left-0 h-full pt-4 ${
          isOpen ? "hidden" : ""
        }`}
      >
        <Icon name="menu" color="text-white" size={20} />
      </button>
    </div>
  );
};

export default LeftSidebar;
