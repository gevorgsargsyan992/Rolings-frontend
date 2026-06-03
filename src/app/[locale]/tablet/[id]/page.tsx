"use client";
import { useParams } from "next/navigation";
import React, { FC, useEffect, useState, useCallback } from "react";
import Typography from "@/components/Typography";
import { TABLET, VIDEOS } from "@/apiConstants";
import { TabletStatusKey } from "@/app/[locale]/tablet/types";
import { formattedDate } from "@/utils";
import { TabletStatus } from "../constants";
import useApi from "@/hooks/useApi";
import NoData from "@/components/NoData";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { TableSkeleton } from "@/components/Skeleton";
import InfoElement from "./components/TabletInfo";
import ModalContent from "@/app/[locale]/tablet/[id]/components/ModalContent";
import PageContainer from "@/components/PageContainer";

const { Text } = Typography;

type TabletVideoRow = {
  tabletVideoId?: number;
  videoId?: number;
  videoName?: string;
  priority?: number;
  [key: string]: any;
};

const normalizeVideos = (videos: TabletVideoRow[] = []) => {
  return [...videos]
    .sort((a, b) => {
      const left = Number(a?.priority ?? a?.videoPriority ?? a?.order ?? 0);
      const right = Number(b?.priority ?? b?.videoPriority ?? b?.order ?? 0);

      return left - right;
    })
    .map((video, index) => ({
      ...video,
      priority: index + 1,
    }));
};

const getOrderSignature = (videos: TabletVideoRow[]) =>
  videos
    .map((video) =>
      String(video?.tabletVideoId ?? video?.videoId ?? video?.id ?? ""),
    )
    .join("|");

const TabletDetail: FC = () => {
  const [tablet, setTablet] = useState<any>({});
  const [videoRows, setVideoRows] = useState<TabletVideoRow[]>([]);
  const [initialVideoOrderSignature, setInitialVideoOrderSignature] =
    useState<string>("");
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [isSavingPriority, setIsSavingPriority] = useState(false);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isVideosModalOpen, setIsVideosModalOpen] = useState(false);
  const [editedStatus, setEditedStatus] = useState<string>(
    tablet?.tablet || "",
  );
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const { id } = useParams();
  const { loading, error, patch, put, get, _delete } = useApi<any>();

  const hasPriorityChanges =
    initialVideoOrderSignature &&
    getOrderSignature(videoRows) !== initialVideoOrderSignature;

  const fetchTablets = useCallback(async () => {
    try {
      const tabletData = await get(`${TABLET}/${id}`);
      if (tabletData) {
        const normalizedVideos = normalizeVideos(tabletData?.videos || []);
        const tabletsToShow = {
          ...tabletData,
          videos: normalizedVideos,
          createdAt:
            tabletData?.createdAt && formattedDate(tabletData.createdAt),
          tabletStatus:
            TabletStatus[tabletData.tabletStatus as TabletStatusKey],
          lastActive:
            tabletData?.lastActive &&
            formattedDate(tabletData.lastActive.createdAt),
          latitude: tabletData?.lastActive?.latitude,
          longitude: tabletData?.lastActive?.longitude,
        };
        setTablet({ ...tabletsToShow });
        setVideoRows(normalizedVideos);
        setInitialVideoOrderSignature(getOrderSignature(normalizedVideos));
        setEditedStatus(
          TabletStatus[tabletData.tabletStatus as TabletStatusKey],
        );
      }
    } catch (err) {
      console.error("Error fetching tablets:", err);
    }
  }, [get, id]);

  useEffect(() => {
    fetchTablets();
    // The API helper functions are re-created on render, so using fetchTablets
    // as a dependency causes repeated requests.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedStatus(event.target.value);
  };

  const handleSaveStatus = async () => {
    try {
      const updatedStatusKey = Object.keys(TabletStatus).find(
        (key) =>
          TabletStatus[key as unknown as TabletStatusKey] === editedStatus,
      );

      await patch(`${TABLET}/${id}`, {
        status: updatedStatusKey && +updatedStatusKey,
      });

      setTablet((prev: any) => ({
        ...prev,
        tabletStatus: editedStatus,
      }));

      setIsEditingStatus(false);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const onModalConfirm = useCallback(async () => {
    const { tabletVideoId } = selectedRow || {};
    if (tabletVideoId) {
      try {
        const response = (await _delete(`${TABLET}/${tabletVideoId}`)) || {};
        if (response?.success) {
          await fetchTablets();
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [_delete, fetchTablets, selectedRow]);

  const onClickDelete = useCallback((row: any) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  }, []);

  const reorderVideos = useCallback((fromIndex: number, toIndex: number) => {
    setVideoRows((prev) => {
      if (
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= prev.length ||
        toIndex >= prev.length
      ) {
        return prev;
      }

      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);

      return updated.map((video, index) => ({
        ...video,
        priority: index + 1,
      }));
    });
  }, []);

  const onSavePriorities = useCallback(async () => {
    if (!id || !videoRows.length || !hasPriorityChanges) return;

    setIsSavingPriority(true);
    const priorities = videoRows.map((row, index) => ({
      tabletVideoId: Number(row?.tabletVideoId),
      videoId: Number(row?.videoId),
      priority: index + 1,
    }));

    try {
      const response =
        (await put(`${VIDEOS}/priority/${id}`, {
          tabletId: +id,
          videos: priorities,
        })) || {};

      if (response?.success === false) {
        return;
      }

      setInitialVideoOrderSignature(getOrderSignature(videoRows));
      await fetchTablets();
    } catch (err) {
      console.error("Error saving video priorities:", err);
    } finally {
      setIsSavingPriority(false);
    }
  }, [fetchTablets, hasPriorityChanges, id, put, videoRows]);

  const onCloseVideosModal = useCallback(() => {
    setIsVideosModalOpen(false);
    fetchTablets();
  }, [fetchTablets]);

  return (
    <PageContainer className="bg-white pb-40 pt-10">
      <div className="flex flex-col relative h-full">
        <div className="mb-10">
          {tablet?.id && <InfoElement name="ID" value={tablet?.id} />}
          {tablet?.tb_uuid && (
            <InfoElement name="UUID" value={tablet?.tb_uuid} />
          )}
          {tablet?.createdAt && (
            <InfoElement name="Creation Time" value={tablet?.createdAt} />
          )}
          {tablet?.lastActive && (
            <InfoElement name="Last Active" value={tablet?.lastActive} />
          )}
          {tablet?.vehicleLicensePlate && (
            <InfoElement
              name="License Plate"
              value={tablet?.vehicleLicensePlate}
            />
          )}
          {tablet?.vehicleName && (
            <InfoElement name="Vehicle Name" value={tablet?.vehicleName} />
          )}
          {(tablet?.latitude || +tablet?.latitude === 0) && (
            <InfoElement name="LAT" value={tablet?.latitude} />
          )}
          {(tablet?.longitude || +tablet?.longitude === 0) && (
            <InfoElement name="LONG" value={tablet?.longitude} />
          )}
          {tablet?.tabletStatus && (
            <div className="flex items-center gap-1">
              <Text className="font-bold">Tablet Status</Text>
              <Text>- {!isEditingStatus && tablet?.tabletStatus}</Text>
              {isEditingStatus && (
                <select
                  value={editedStatus}
                  onChange={handleStatusChange}
                  className="ml-2 p-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 transition ease-in-out duration-150">
                  {Object.values(TabletStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              )}
              {isEditingStatus ? (
                <div className="flex gap-2 ml-4">
                  <Button onClick={handleSaveStatus}>Save</Button>
                  <Button
                    type="ghost"
                    onClick={() => setIsEditingStatus(false)}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  type="text"
                  className="ml-2"
                  size="small"
                  onClick={() => setIsEditingStatus(true)}>
                  Edit
                </Button>
              )}
            </div>
          )}
        </div>
        <div className="mb-16">
          {loading ? (
            <TableSkeleton />
          ) : videoRows?.length ? (
            <div className="flex flex-col w-full pt-4 overflow-x-auto">
              <table className="table-fixed w-full">
                <thead>
                  <tr>
                    <th className="border-b-2 text-left px-4 py-2 w-[10%]">
                      <Text className="text-sm md:text-base lg:text-lg">#</Text>
                    </th>
                    <th className="border-b-2 text-left px-4 py-2 w-[20%]">
                      <Text className="text-sm md:text-base lg:text-lg">
                        ID
                      </Text>
                    </th>
                    <th className="border-b-2 text-left px-4 py-2 w-[45%]">
                      <Text className="text-sm md:text-base lg:text-lg">
                        Video Name
                      </Text>
                    </th>
                    <th className="border-b-2 text-left px-4 py-2 w-[15%]">
                      <Text className="text-sm md:text-base lg:text-lg">
                        Move
                      </Text>
                    </th>
                    <th className="border-b-2 text-left px-4 py-2 w-[10%]">
                      <Text className="text-sm md:text-base lg:text-lg">
                        Action
                      </Text>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {videoRows.map((row, index) => (
                    <tr
                      key={String(row?.tabletVideoId ?? row?.videoId ?? index)}
                      draggable
                      onDragStart={() => setDraggingIndex(index)}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={() => {
                        if (draggingIndex === null) return;
                        reorderVideos(draggingIndex, index);
                        setDraggingIndex(null);
                      }}
                      onDragEnd={() => setDraggingIndex(null)}
                      className="hover:bg-gray-100">
                      <td className="border-b px-4 py-2">
                        <Text className="text-xs md:text-sx lg:text-base">
                          {row?.priority}
                        </Text>
                      </td>
                      <td className="border-b px-4 py-2">
                        <Text className="text-xs md:text-sx lg:text-base">
                          {row?.videoId}
                        </Text>
                      </td>
                      <td className="border-b px-4 py-2">
                        <Text className="text-xs md:text-sx lg:text-base">
                          {row?.videoName}
                        </Text>
                      </td>
                      <td className="border-b px-4 py-2">
                        <Text className="text-xs md:text-sx lg:text-base text-gray-500">
                          Drag row
                        </Text>
                      </td>
                      <td className="border-b px-4 py-2">
                        <Button type="text" onClick={() => onClickDelete(row)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {hasPriorityChanges && (
                <div className="flex justify-end mt-4">
                  <Button
                    size="small"
                    onClick={onSavePriorities}
                    loading={isSavingPriority}>
                    Save Priority
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <NoData message="No Videos Available" />
          )}
        </div>
        <Button
          className="w-[160px] self-end mr-0 md:mr-24 absolute bottom-0"
          size="small"
          onClick={() => setIsVideosModalOpen(true)}>
          Add New
        </Button>
        <Modal
          isOpen={isVideosModalOpen}
          showButtons={false}
          onClose={onCloseVideosModal}>
          <ModalContent />
        </Modal>
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          subtitle="Do you want to delete?"
          onConfirm={onModalConfirm}
        />
      </div>
    </PageContainer>
  );
};

export default TabletDetail;
