import { FC } from "react";
import Typography from "@/components/Typography";
const { Text } = Typography;

interface IProps {
  name: string;
  value: string;
}
const TabletInfo: FC<IProps> = ({ name = "", value = "" }) => (
  <div className="flex mb-2 gap-1">
    <Text bold className="text-sm md:text-lg">
      {name}
    </Text>
    <Text className="text-xs md:text-base">{` - ${value}`}</Text>
  </div>
);

export default TabletInfo;
