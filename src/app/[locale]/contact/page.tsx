import { FC } from "react";
import Image from "next/image";
import Typography from "@/components/Typography";
import imgRolings from "../../../../public/rolings-rectangle.svg";

const { Text } = Typography;

const items: string[] = [
  "First milestone mmmmmmm nnnn kkkkkkkkkkk",
  "Second milestone",
  "Third milestone",
  "Fourth milestone",
];

const VerticalTimeline: FC = () => {
  return (
    <div className="flex gap-10 md:gap-4">
      <div className="w-full h-auto sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg mx-auto">
        <Image src={imgRolings} alt="rolings image" layout="responsive" />
      </div>
      <div className="flex flex-col items-start pl-12">
        <Text color="text-black" level={1}>
          About us
        </Text>
        <Text color="text-gray-800" level={5} className="mt-2 mb-10">
          Some dummy text
        </Text>
        {items.map((item, index) => (
          <div key={index} className="flex">
            <div className="flex flex-col items-center h-full">
              <div className="flex items-center justify-center w-7 h-7 bg-blue-500 text-white rounded-full">
                {index + 1}
              </div>
              {index !== items.length - 1 && (
                <div className="h-full border-l-2 border-gray-500" />
              )}
            </div>
            <Text className="pb-4 pl-8" color="text-black">
              {item}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalTimeline;
