import { FC } from "react";
import Advantage from "./Advatage";

const DATA1 = ["անձնական էջ", "մոնիտորինգ", "ընտրության հնարավորություն"];
const DATA2 = ["հարցաշարեր", "Տվյալների բազա", "24/7 հասանելիություն"];

const Advantages: FC = () => {
  return (
    <div className="flex flex-col">
      <div className="flex">
        {DATA1.map((el, idx) => (
          <Advantage className="mr-3" text={el} key={idx} />
        ))}
      </div>
      <div className="flex mr-3 mt-3">
        {DATA2.map((el, idx) => (
          <Advantage className="mr-3" text={el} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Advantages;