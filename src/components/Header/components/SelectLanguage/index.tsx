import { useCallback, useEffect, useState } from "react";
import Select from "@/components/Select";
import { useTranslation } from "react-i18next";
import { LANGUAGE_OPTIONS } from "@/components/constants";

const SelectLanguage = () => {
  const { i18n } = useTranslation();
  
  const savedLanguage = localStorage.getItem("language");
  const defaultLanguage = LANGUAGE_OPTIONS.find(lang => lang.value === savedLanguage) || LANGUAGE_OPTIONS[0];

  const changeLanguage = useCallback((language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  }, [i18n]);

  useEffect(() => {
    if (savedLanguage) {
      changeLanguage(savedLanguage);
    }
  }, [changeLanguage, savedLanguage]);

  return (
    <Select
      options={LANGUAGE_OPTIONS}
      defaultValue={defaultLanguage}
      onSelect={(option) => changeLanguage(option.value)}
    />
  );
};

export default SelectLanguage;
