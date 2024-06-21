import { FC, useCallback, useEffect, useState } from "react";
import { VIDEOS } from "@/apiConstants";
import { formattedDate } from "@/utils";
import { TabletStatus } from "@/app/[locale]/tablet/constants";
import { TabletStatusKey } from "@/app/[locale]/tablet/types";
import useApi from "@/hooks/useApi";
import {VideoDataType} from './types'
import VideoData from "./component/VideoData";
import {TableSkeleton} from "@/components/Skeleton";
import Typography from "@/components/Typography";

const {Text} = Typography
const ModalContent: FC = () => {
  const [videos, setVideos] = useState<VideoDataType[]>([]);
  const { loading, error, patch, get, _delete } = useApi<any>();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = useCallback(async () => {
    try {
      const videoData = await get(`${VIDEOS}`);
      setVideos(videoData)
        console.log('videos>>>>>', videoData)
      // if (!!videoData?.length) {
      //     const videosToShow = [
      //         ...videoData,
      //         createdAt: formattedDate(videoData?.createdAt),
      //         tabletStatus:
      //             TabletStatus[videoData.tabletStatus as TabletStatusKey],
      //         lastActive: formattedDate(videoData?.lastActive?.createdAt),
      //         latitude: videoData?.lastActive?.latitude,
      //         longitude: videoData?.lastActive?.longitude,
      //     ];
      //     setVideos({ ...videosToShow });
      // }
    } catch (err) {
      console.error("Error fetching tablets:", err);
    }
  }, []);

  return videos?.length ? (
    <div>
      <div className='flex w-full justify-between gap-1'>
        <Text>ID</Text>
        <Text>Status</Text>
        <Text>Name</Text>
        <Text>URL</Text>
        <Text>Creation Time</Text>
      </div>
      {videos?.map((video) => (
        <VideoData video={video} key={video?.id} />
      ))}
    </div>
  ) : <TableSkeleton />;
};

export default ModalContent;
