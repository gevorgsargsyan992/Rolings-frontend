"use client";

import { useState, useMemo, useEffect, useRef, FC } from "react";
import Link from "next/link";
import i18nConfig from "../../../i18nConfig";
import { localeNameMap } from "@/constants/locales";
import Typography from "../Typography";
import Icon from "@/components/Icon";
import { LanguageChangerProps } from "./types";

const { Text } = Typography;

const LanguageChanger: FC<LanguageChangerProps> = ({ className = "" }) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [savedLanguage, setSavedLanguage] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const language = window.localStorage.getItem("language");
      setSavedLanguage(language);
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const languageToShow = useMemo(() => {
    if (savedLanguage) return localeNameMap[savedLanguage];
    return localeNameMap[i18nConfig?.defaultLocale];
  }, [savedLanguage]);

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <div>
        <button
          onClick={toggleDropdown}
          className="py-2 flex items-center text-gray-800"
        >
          <Text className="font-semibold mr-1" color="text-black">
            {languageToShow}
          </Text>
          <Icon name={dropdownOpen ? "arrow-up-small" : "arrow-down-small"} />
        </button>
      </div>
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-10 right-0 w-48 bg-white border border-gray-200 rounded-md shadow-md z-10"
        >
          {i18nConfig.locales.map((localeCode) => (
            <Link
              key={localeCode}
              scroll={false}
              href={`/${localeCode}`}
              onClick={() =>
                window.localStorage.setItem("language", localeCode)
              }
              className="block w-full px-2 py-2 text-gray-800 hover:bg-gray-100"
            >
              {localeNameMap[localeCode]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageChanger;
