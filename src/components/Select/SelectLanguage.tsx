"use client";

import Link from "next/link";
import i18nConfig from "../../../i18nConfig";
import { localeNameMap } from "../../constants/locales";

export default function LanguageChanger() {
  return (
    <ul className="flex xs:text-sm lg:text-lg bg-red lg:mt-0 xs:mt-4 content-center p-2 ">
      {i18nConfig.locales.map((localeCode) => (
        <li key={localeCode} className="text-gray-900 border-8 ">
          <Link scroll={false} href={`/${localeCode}`}>
            {localeNameMap[localeCode]}
          </Link>
        </li>
      ))}
    </ul>
  );
}
