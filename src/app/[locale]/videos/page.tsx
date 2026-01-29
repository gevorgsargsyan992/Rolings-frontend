"use client";
import React, { FC, useEffect, useState } from "react";
import Table from "@/components/Table";
import useApi from "@/hooks/useApi";
import { COLUMNS, VideoStatus } from "./constants";
import { VideosData, VideoStatusKey } from "./types";
import { VIDEOS } from "@/apiConstants";
import { formattedDate } from "@/utils";
import NoData from "@/components/NoData";
import PageContainer from "@/components/PageContainer";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { UserType } from "@/types/UserTypes";
import { TableSkeleton } from "@/components/Skeleton";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

const Tablets: FC = () => {
  const [videos, setVideos] = useState<any>([]);
  const [isVideosModalOpen, setIsVideosModalOpen] = useState(false);
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newVideoFile, setNewVideoFile] = useState<File | null>(null);
  const { get, loading } = useApi<any>();

  useEffect(() => {
    const fetchTablets = async () => {
      try {
        const data = await get(`${VIDEOS}`);

        if (data?.length) {
          const videosToShow = data.map((video: VideosData) => ({
            ...video,
            createdAt: video?.createdAt && formattedDate(video.createdAt),
            status: VideoStatus[video.status as VideoStatusKey],
          }));
          setVideos(videosToShow);
        }
      } catch (err) {
        console.error("Error fetching tablets:", err);
      }
    };

    fetchTablets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddNewVideo = () => {
    if (newVideoTitle && newVideoFile) {
      setIsVideosModalOpen(false);
      setNewVideoTitle("");
      setNewVideoFile(null);
    }
  };

  const onClickEdit = (row: any) => {
    //TODO: add logic later
  };

  const onClickDelete = (row: any) => {
    //TODO: add logic later
  };

  return (
    <ProtectedRoute allowedRoles={[UserType.SUPER_ADMIN]}>
      <PageContainer className="bg-white pb-40 pt-10">
        {loading ? (
          <TableSkeleton />
        ) : videos.length > 0 ? (
          <div className="flex flex-col">
            <Table
              columns={COLUMNS}
              data={videos || []}
              url="video"
              className="overflow-x-auto whitespace-nowrap"
              isRowClickable={false}
            />
          </div>
        ) : (
          <NoData />
        )}
      </PageContainer>
    </ProtectedRoute>
  );
};

export default Tablets;
