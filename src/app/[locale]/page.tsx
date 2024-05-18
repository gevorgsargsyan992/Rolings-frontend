import CurrentlyWorking from "@/components/CurrentlyWorking";
import initTranslations from "../../../i18n";
import TranslationsProvider from "@/TranslationsProvider";

const i18nNameSpaces = ["blog, offers"];

export default async function Home({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, ["blog"]);
  return (
    <TranslationsProvider
      resources={resources}
      namespaces={i18nNameSpaces}
      locale={locale}
    >
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <CurrentlyWorking />
      </div>
    </TranslationsProvider>
  );
}
