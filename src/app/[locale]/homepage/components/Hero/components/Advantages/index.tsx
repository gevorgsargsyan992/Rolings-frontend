import { FC, useMemo } from "react";
import Advantage from "./Advatage";
import { useTranslation } from "react-i18next";

const Advantages: FC = () => {
  const { t } = useTranslation() as any;

  const DATA1 = useMemo(
    () => [t("personal-page"), t("monitoring"), t("choice")],
    []
  );
  const DATA2 = useMemo(
    () => [t("surveys"), t("database"), t("availability")],
    []
  );

  return (
    <div className="flex flex-col md:items-center lg:items-start">
      <div className="flex flex-col md:flex-row">
        {DATA1.map((el, idx) => (
          <Advantage className="mr-0 md:mr-3" text={el} key={idx} />
        ))}
      </div>
      <div className="flex flex-col md:flex-row mt-0 md:mt-3">
        {DATA2.map((el, idx) => (
          <Advantage className="mr-0 md:mr-3" text={el} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Advantages;
