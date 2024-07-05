import { FC, useCallback, useEffect, useState } from "react";
import { NOT_ASSIGNED_VIDEOS } from "@/apiConstants";
import useApi from "@/hooks/useApi";
import { VideoDataType } from "./types";
import { useParams } from "next/navigation";
import VideoData from "./component/VideoData";
import { TableSkeleton } from "@/components/Skeleton";
import Typography from "@/components/Typography";
import NoData from "@/components/NoData";

const { Text } = Typography;

const DATA_TITLES = [
  { title: "ID" },
  { title: "Status" },
  { title: "Name", className: "max-w-[260px]" },
  { title: "URL" },
  { title: "Creation time", className: "max-w-[200px]" },
];

const ModalContent: FC = () => {
  const [videos, setVideos] = useState<VideoDataType[]>([]);
  const { get, loading } = useApi<any>();
  const { id: tabletId } = useParams();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = useCallback(async () => {
    try {
      const videoData = await get(`${NOT_ASSIGNED_VIDEOS}/${tabletId}`);
      setVideos(videoData);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  }, []);

  return loading ? (
    <TableSkeleton />
  ) : videos.length ? (
    <div className="py-4 max-w-5xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl">
      <div className="grid grid-cols-[0.1fr_1fr_1fr_1fr_1fr_0.2fr] gap-3 mb-4">
        {DATA_TITLES.map((el) => (
          <Text
            className={`text-center text-sm md:text-base ${
              el.className ? el.className : ""
            }`}
            key={el.title}
          >
            {el.title}
          </Text>
        ))}
      </div>
      {videos.map((video) => (
        <VideoData video={video} key={video.id} />
      ))}
    </div>
  ) : (
    <NoData message="No videos available" />
  );
};

export default ModalContent;
