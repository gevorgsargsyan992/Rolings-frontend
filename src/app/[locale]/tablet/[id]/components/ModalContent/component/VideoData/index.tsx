import { FC } from "react";
import Image from 'next/image';
import { IVideoData } from "./types";
import Typography from "@/components/Typography";
import {formattedDate} from "@/utils";
import {TabletStatus} from "@/app/[locale]/tablet/constants";
import {TabletStatusKey} from "@/app/[locale]/tablet/types";

const {Text} = Typography

const VideoData: FC<IVideoData> = ({ video }) => {
  const {id, name, status, url, createdAt} = video || {}
  console.log("video>>>", video);
  return !!video && <div className='flex w-full justify-between gap-3 mt-2'>
    <Text>{id}</Text>
    <Text>{TabletStatus[status as TabletStatusKey]}</Text>
    <Text>{name}</Text>
    <Text>{url}</Text>
    <Text>{formattedDate(createdAt)}</Text>
    {/*TODO: add button with image*/}
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 22 22"
        strokeWidth={2}
        stroke="currentColor"
        className="w-8 h-8 text-green-600 hover:text-green-800 p-2 bg-gray-200 rounded-full"
    >
      <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  </div>;
};

export default VideoData;
