import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const savedLanguage = localStorage.getItem("language");

  useEffect(() => {
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n, savedLanguage]);
};