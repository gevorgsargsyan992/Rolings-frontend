import { FC } from "react";
import Advantage from "./Advatage";

const DATA1 = ["անձնական էջ", "մոնիտորինգ", "ընտրության հնարավորություն"];
const DATA2 = ["հարցաշարեր", "Տվյալների բազա", "24/7 հասանելիություն"];

const Advantages: FC = () => {
  return (
    <div className="flex flex-col">
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
