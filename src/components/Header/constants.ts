import { useTranslation } from "react-i18next";

export const DATA = () => {
  const { t } = useTranslation() as any;

  return [
    {
      id: 1,
      name: t("offers"),
      link: "/offers",
    },
    {
      id: 2,
      name: t("blog"),
      link: "/blog",
    },
    {
      id: 3,
      name: t("aboutus"),
      link: "/aboutus",
    },
    {
      id: 4,
      name: t("contact"),
      link: "/contact",
    },
  ];
};
