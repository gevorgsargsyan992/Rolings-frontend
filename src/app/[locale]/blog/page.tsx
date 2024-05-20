import {FC} from "react";
import CurrentlyWorking from "@/components/CurrentlyWorking";
import {useTranslation} from "react-i18next";

const Blog: FC = () => {
  const { t } = useTranslation()
  return <>
    <p>{t('registration')}</p>
    <CurrentlyWorking />
  </>;
};

export default Blog;
