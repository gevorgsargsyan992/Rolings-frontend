import initTranslations from "../../../i18n";
import TranslationsProvider from "@/TranslationsProvider";
import HomePage from "./homepage";

const i18nNameSpaces = ["blog, offers"];

export interface HomeProps {
  params: {
    locale: string;
  };
}

export default async function Home({ params: { locale } }: HomeProps) {
  const { t, resources } = await initTranslations(locale, ["blog"]);
  return (
    <TranslationsProvider
      resources={resources}
      namespaces={i18nNameSpaces}
      locale={locale}
    >
      <HomePage />
    </TranslationsProvider>
  );
}
