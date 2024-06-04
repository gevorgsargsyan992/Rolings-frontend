import { FC } from "react";
import Advantage from "./Advatage";

const DATA1 = ["andznakan ej", "manitoring", "yntrutyan hnaravorutyun"];
const DATA2 = ["harcasharer", "Data base", "24/7 suport "];

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