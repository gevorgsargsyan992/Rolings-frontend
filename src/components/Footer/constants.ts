import { useTranslation } from "react-i18next";

export const DATA = () => {
  const { t } = useTranslation() as any;
  return [
    {
      title: t("service"),
      data: [
        {
          text: t("offers"),
          link: "/offers",
        },
        {
          text: t("blog"),
          link: "/blog",
        },
        {
          text: t("aboutus"),
          link: "/contact", //TODO: change this to about us
        },
        {
          text: t("contact"),
          link: "/contact",
        },
      ],
    },
    {
      title: t("company"),
      data: [
        {
          text: t("service"),
          link: "/",
        },
        {
          text: t("partners"),
          link: "/",
        },
        {
          text: t("portfolio"),
          link: "/contact",
        },
      ],
    },
  ];
};

export const INFO_DATA = () => {
  const { t } = useTranslation() as any;

  return [
    {
      id: 1,
      text: t("address-real"),
      iconName: "location",
    },
    {
      id: 2,
      text: "info@rolings.am",
      iconName: "email",
    },
    {
      id: 3,
      text: "+374 55 540 002",
      iconName: "phone",
    },
  ];
};
