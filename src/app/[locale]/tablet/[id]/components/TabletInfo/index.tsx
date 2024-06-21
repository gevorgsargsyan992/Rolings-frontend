import { FC } from "react";
import Typography from "@/components/Typography";
const { Text } = Typography;

interface IProps {
    name: string;
    value: string;
}
const TabletInfo: FC<IProps> = ({ name = "", value = "" }) => (
    <div className="flex mb-2 gap-1">
        <Text level={6} color="text-black" className="bold">
            {name}
        </Text>
        <Text level={6}>{` - ${value}`}</Text>
    </div>
);

export default TabletInfo;
