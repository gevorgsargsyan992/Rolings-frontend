import { FC } from "react";
import Text from "@/components/Typography/Text";
import { NoDataProps } from "@/components/NoData/types";

const NoData: FC<NoDataProps> = ({ message = "No data available." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Text className="text-gray-500 text-sm md:text-base lg:text-lg">{message}</Text>
    </div>
  );
};

export default NoData;
