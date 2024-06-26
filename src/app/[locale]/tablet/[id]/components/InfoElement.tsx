import { FC } from "react";
import Typography from "@/components/Typography";
const { Text } = Typography;

interface IProps {
  name: string;
  value: string;
}
const InfoElement: FC<IProps> = ({ name = "", value = "" }) => (
  <div className="flex mb-2 gap-1">
    <Text color="text-black" className="bold">
      {name}
    </Text>
    <Text>{` - ${value}`}</Text>
  </div>
);

export default InfoElement;
