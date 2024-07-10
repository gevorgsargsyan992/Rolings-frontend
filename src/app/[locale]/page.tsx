import initTranslations from "../../../i18n";
import TranslationsProvider from "@/TranslationsProvider";
import HomePage from "./homepage";

const i18nNameSpaces = ["blog, offers"];

export interface HomeProps {
  params: {
    locale: string;
  };
}

const i18nNamespaces = ['common'];

export default async function Home({ params: { locale } }: HomeProps) {
  const { resources } = await initTranslations(locale, i18nNamespaces, undefined, undefined);
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
