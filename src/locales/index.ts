import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEn from "./resources/en.json";
import translationRu from "./resources/ru.json";
import translationArm from "./resources/arm.json";

const resources = {
  en: {
    translation: translationEn,
  },
  ru: {
    translation: translationRu,
  },
  arm: {
    translation: translationArm,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});