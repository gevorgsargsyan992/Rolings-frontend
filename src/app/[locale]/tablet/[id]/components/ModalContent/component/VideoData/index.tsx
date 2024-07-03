import { FC, useCallback, useState } from "react";
import Typography from "@/components/Typography";
import { formattedDate } from "@/utils";
import { TabletStatus } from "@/app/[locale]/tablet/constants";
import { TabletStatusKey } from "@/app/[locale]/tablet/types";
import { useParams } from "next/navigation";
import useApi from "@/hooks/useApi";
import { TABLET_ASSIGN_VIDEO } from "@/apiConstants";
import Icon from "@/components/Icon";

const { Text } = Typography;

const VideoData: FC<{ video: any }> = ({ video }) => {
  const { id, name, status, url, createdAt } = video || {};
  const [isAssigned, setIsAssigned] = useState<boolean>(false);
  const { id: tabletId } = useParams();
  const { post } = useApi<any>();

  const onAssignVideo = useCallback(async () => {
    if (tabletId && id) {
      try {
        const { success } =
          (await post(TABLET_ASSIGN_VIDEO, {
            tabletId: +tabletId,
            videoId: +id,
          })) || {};
        if (success) {
          setIsAssigned(true);
        }
      } catch (error) {
        console.error("Error assigning video:", error);
      }
    }
  }, [id, tabletId, post]);

  return (
    <div className="grid grid-cols-[0.1fr_1fr_1fr_1fr_1fr_0.2fr] gap-3 mt-2 items-center">
      <Text className="text-center mt-2">{id}</Text>
      <Text className="text-center mt-2">
        {TabletStatus[status as TabletStatusKey]}
      </Text>
      <Text className="text-center mt-2 overflow-hidden max-w-[260px] whitespace-nowrap overflow-ellipsis">
        {name}
      </Text>
      <a
        href={url}
        className="text-center text-blue-500 underline"
        target="blank"
      >
        Link
      </a>
      <Text className="text-center mt-2 max-w-[200px]">
        {formattedDate(createdAt)}
      </Text>
      <button
        disabled={isAssigned}
        className="flex justify-center items-center self-center mt-2"
        onClick={onAssignVideo}
      >
        <Icon name={isAssigned ? "green-check" : "plus"} />
      </button>
    </div>
  );
};

export default VideoData;
