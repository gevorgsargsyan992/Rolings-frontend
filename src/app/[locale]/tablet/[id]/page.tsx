"use client";
import { useParams } from "next/navigation";
import React, { FC, useEffect, useState, useCallback } from "react";
import Typography from "@/components/Typography";
import { TABLET } from "@/apiConstants";
import { TabletStatusKey } from "@/app/[locale]/tablet/types";
import { formattedDate } from "@/utils";
import { TabletStatus, COLUMNS_VIDEO } from "@/app/[locale]/tablet/constants";
import { TabletProps } from "./types";
import useApi from "@/hooks/useApi";
import Table from "@/components/Table";
import NoData from "@/components/NoData";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { TableSkeleton } from "@/components/Skeleton";
import InfoElement from "@/app/[locale]/tablet/[id]/components/InfoElement";

const { Text } = Typography;

const TabletDetail: FC<TabletProps> = () => {
  const [tablet, setTablet] = useState<any>({});
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedStatus, setEditedStatus] = useState<string>(
    tablet?.tablet || ""
  );
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const { id } = useParams();
  const { loading, error, patch, get, _delete } = useApi<any>();

  useEffect(() => {
    setIsModalOpen(false);
  }, [isModalOpen]);

  useEffect(() => {
    fetchTablets();
  }, []);

  const fetchTablets = useCallback(async () => {
    try {
      const tabletData = await get(`${TABLET}/${id}`);
      if (tabletData) {
        const tabletsToShow = {
          ...tabletData,
          createdAt: formattedDate(tabletData?.createdAt),
          tabletStatus:
            TabletStatus[tabletData.tabletStatus as TabletStatusKey],
          lastActive: formattedDate(tabletData?.lastActive?.createdAt),
          latitude: tabletData?.lastActive?.latitude,
          longitude: tabletData?.lastActive?.longitude,
        };
        setTablet({ ...tabletsToShow });
        console.log("tabletsToShow", tabletsToShow);
        setEditedStatus(
          TabletStatus[tabletData.tabletStatus as TabletStatusKey]
        );
      }
    } catch (err) {
      console.error("Error fetching tablets:", err);
    }
  }, []);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedStatus(event.target.value);
  };

  const handleSaveStatus = async () => {
    try {
      const updatedStatusKey = Object.keys(TabletStatus).find(
        (key) =>
          TabletStatus[key as unknown as TabletStatusKey] === editedStatus
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
    setIsModalOpen(true);
  }, []);


  return (
    <div className="flex flex-col relative h-full">
      <div className="mb-10">
        {tablet?.id && <InfoElement name="ID" value={` - ${tablet?.id}`} />}
        {tablet?.tb_uuid && (
          <InfoElement name="UUID" value={` - ${tablet?.tb_uuid}`} />
        )}
        {tablet?.createdAt && (
          <InfoElement name="Creation Time" value={` - ${tablet?.createdAt}`} />
        )}
        {tablet?.lastActive && (
          <InfoElement name="Last Active" value={` - ${tablet?.lastActive}`} />
        )}
        {tablet?.latitude && (
          <InfoElement name="LAT" value={` - ${tablet?.latitude}`} />
        )}
        {tablet?.latitude && (
          <InfoElement name="LONG" value={` - ${tablet?.longitude}`} />
        )}
        {tablet?.tabletStatus && (
          <div className="flex items-center gap-1">
            <Text color="text-black" level={6} className="bold">
              Tablet Status
            </Text>
            <Text level={6}>- {!isEditingStatus && tablet?.tabletStatus}</Text>
            {isEditingStatus && (
              <select
                value={editedStatus}
                onChange={handleStatusChange}
                className="ml-2 p-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 transition ease-in-out duration-150"
              >
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
                <Button type="ghost" onClick={() => setIsEditingStatus(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                type="text"
                className="ml-2"
                size="small"
                onClick={() => setIsEditingStatus(true)}
              >
                Edit
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="mb-16">
        {loading ? (
          <TableSkeleton />
        ) : tablet?.videos?.length ? (
          <Table
            data={tablet?.videos || []}
            columns={COLUMNS_VIDEO}
            isRowClickable={false}
            rowActions={[
              {
                label: "Delete",
                onClick: (row) => onClickDelete(row),
              },
            ]}
          />
        ) : (
          <NoData message="No Videos Available" />
        )}
      </div>
      <Button
        className="w-[160px] self-end mr-24 absolute bottom-0"
        size="small"
        onClick={() => {
          //TODO: open modal width videos data
        }}
      >
        Add New
      </Button>
      <Modal
        isOpen={isModalOpen}
        subtitle="Do you want to delete?"
        onConfirm={onModalConfirm}
      />
    </div>
  );
};

export default TabletDetail;
