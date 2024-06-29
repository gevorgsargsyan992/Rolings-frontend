import { FC } from "react";
import Typography from "@/components/Typography";
import { formattedDate } from "@/utils";
import { TabletStatus } from "@/app/[locale]/tablet/constants";
import { TabletStatusKey } from "@/app/[locale]/tablet/types";

const { Text } = Typography;

const VideoData: FC<{ video: any }> = ({ video }) => {
    const { id, name, status, url, createdAt } = video || {};

    return (
        <div className="grid grid-cols-[0.1fr_1fr_1fr_1fr_1fr_0.5fr] gap-3 mt-2 items-center">
            <Text className="text-center mt-2">{id}</Text>
            <Text className="text-center mt-2">{TabletStatus[status as TabletStatusKey]}</Text>
            <Text className="text-center mt-2">{name}</Text>
            <a href={url} className="text-center text-blue-500 underline" target='blank'>Link</a>
            <Text className="text-center mt-2">{formattedDate(createdAt)}</Text>
            <button className="flex justify-center items-center mt-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 22 22"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6 text-green-600 hover:text-green-800 p-2 bg-gray-200 rounded-full"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m12-12h-20"
                    />
                </svg>
            </button>
        </div>
    );
};

export default VideoData;
