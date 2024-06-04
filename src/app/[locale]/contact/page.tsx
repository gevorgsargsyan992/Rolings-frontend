import { FC } from "react";
import Image from "next/image";
import Typography from "@/components/Typography";
import imgRolings from "../../../../public/rolings-rectangle.svg";

const { Text, Title } = Typography;

const items: string[] = [
  "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  "when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more",
  "when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more",
];

const VerticalTimeline: FC = () => {
  return (
    <div className="flex gap-10 md:gap-4">
      <div className="w-full flex-1 h-auto sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg mx-auto">
        <Image src={imgRolings} alt="rolings image" layout="responsive" />
      </div>
      <div className="flex flex-col flex-1 items-start pl-12">
        <Title color="text-black" className="font-semibold" level={3}>
          About us
        </Title>
        <Text
          color="text-gray-800"
          level={6}
          className="mt-2 mb-10 font-normal"
        >
          Simply dummy text of the printing and typesetting
        </Text>
        {items.map((item, index) => (
          <div key={index} className="flex">
            <div
              className={`flex flex-col items-center h-full ${
                index === items.length - 1 ? "pb-4" : ""
              }`}
            >
              <div className="flex items-center justify-center w-7 h-7 bg-blue-800  rounded-full">
                <Text className="text-white">
                  {index + 1}
                </Text>
              </div>
              {index !== items.length && (
                <div className="h-full border-l-2 border-gray-500 pb-4" />
              )}
            </div>
            <Text className="pb-4 pl-8 font-medium" color="text-black">
              {item}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalTimeline;
