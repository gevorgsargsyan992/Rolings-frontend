import { FC } from "react";
import Advantage from "./Advatage";

const DATA1 = ["Advatange 1", "Advatange 2", "Advatange 3"];

const DATA2 = ["Advatange 4", "Advatange 5", "Advatange 6"];

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
          <Advantage  className="mr-3" text={el} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Advantages;
