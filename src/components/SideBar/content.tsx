import { UserType } from "@/types/UserTypes";

export const getData = (userType: UserType) => {
  return [
    {
      link: "/tablet",
      title: "Tablets",
      iconName: "tablet",
      isVisible: userType === UserType.SUPER_ADMIN,
    },
    {
      link: "/videos",
      title: "Videos",
      iconName: "video",
      isVisible: userType === UserType.SUPER_ADMIN,
    },
    {
      link: "/users",
      title: "Users",
      iconName: "users",
      isVisible: userType === UserType.SUPER_ADMIN,
    },
    {
      link: "/email-stats",
      title: "Email stats",
      iconName: "email",
      isVisible: userType === UserType.SUPER_ADMIN,
    },
    {
      link: "/monitoring",
      title: "Monitoring",
      iconName: "monitoring",
      isVisible:
        userType === UserType.SUPER_ADMIN || userType === UserType.SELLER,
    },
    {
      link: "/questionnaire",
      title: "Questionnaire",
      iconName: "forum",
      isVisible:
        userType === UserType.SUPER_ADMIN || userType === UserType.SELLER,
    },
  ];
};
