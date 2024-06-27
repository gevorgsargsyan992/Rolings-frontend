import { FC, useCallback, useEffect, useState } from "react";
import { VIDEOS } from "@/apiConstants";
import useApi from "@/hooks/useApi";
import { VideoDataType } from './types';
import VideoData from "./component/VideoData";
import { TableSkeleton } from "@/components/Skeleton";
import Typography from "@/components/Typography";

const { Text } = Typography;

const ModalContent: FC = () => {
  const [videos, setVideos] = useState<VideoDataType[]>([]);
  const { get } = useApi<any>();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = useCallback(async () => {
    try {
      const videoData = await get(`${VIDEOS}`);
      setVideos(videoData);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  }, [get]);

  return videos.length ? (
      <div className="p-4 items-center">
        <div className="grid grid-cols-[0.1fr_1fr_1fr_1fr_1fr_0.5fr] gap-3 mb-4">
          <Text className="text-center">ID</Text>
          <Text className="text-center">Status</Text>
          <Text className="text-center">Name</Text>
          <Text className="text-center">URL</Text>
          <Text className="text-center">Creation Time</Text>
        </div>
        {videos.map((video) => (
            <VideoData video={video} key={video.id} />
        ))}
      </div>
  ) : (
      <TableSkeleton />
  );
};

export default ModalContent;
