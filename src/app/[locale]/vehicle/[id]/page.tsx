"use client";
import { useParams } from "next/navigation";
import React, { FC, useEffect, useState, useCallback } from "react";
import Typography from "@/components/Typography";
import { VEHICLE } from "@/apiConstants";
import { VehicleStatusKey } from "@/app/[locale]/vehicle/types";
import { formattedDate } from "@/utils";
import { VehicleStatus } from "../constants";
import useApi from "@/hooks/useApi";
import Table from "@/components/Table";
import NoData from "@/components/NoData";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { TableSkeleton } from "@/components/Skeleton";
import InfoElement from "./components/TabletInfo";
import ModalContent from "@/app/[locale]/tablet/[id]/components/ModalContent";
import PageContainer from "@/components/PageContainer";
import { TabletStatus } from "@/app/[locale]/tablet/constants";
import { TabletStatusKey } from "@/app/[locale]/tablet/types";

const { Text } = Typography;

const TabletDetail: FC = () => {
  const [vehicle, setVehicle] = useState<any>({});
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isVideosModalOpen, setIsVideosModalOpen] = useState(false);
  const [editedStatus, setEditedStatus] = useState<string>("");
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const { id } = useParams();
  const { loading, error, patch, get } = useApi<any>();

  useEffect(() => {
    fetchVehicle();
  }, []);

  const fetchVehicle = useCallback(async () => {
    try {
      const vehicleData = await get(`${VEHICLE}/${id}`);
      if (vehicleData) {
        const vehiclesToShow = {
          ...vehicleData,
          tabletStatus:
            VehicleStatus[vehicleData.tabletStatus as VehicleStatusKey],
        };
        setVehicle(vehiclesToShow);
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
      const updatedStatusKey = Object.keys(VehicleStatus).find(
        (key) =>
          VehicleStatus[key as unknown as VehicleStatusKey] === editedStatus,
      );

      await patch(`${VEHICLE}/${id}`, {
        status: updatedStatusKey && +updatedStatusKey,
      });

      setVehicle((prev: any) => ({
        ...prev,
        vehicleStatus: editedStatus,
      }));

      setIsEditingStatus(false);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <PageContainer className="bg-white pb-40 pt-10">
      <div className="flex flex-col relative h-full">
        <div className="mb-10">
          <Text bold className="text-sm md:text-lg">
            Tablet connected -
          </Text>
          {/*TODO: add here dropdown where we can chose another tablet*/}
          {vehicle?.name && <InfoElement name="Name" value={vehicle?.name} />}
          {vehicle?.color && (
            <InfoElement name="Color" value={vehicle?.color} />
          )}
          {vehicle?.licensePlate && (
            <InfoElement name="License Plate" value={vehicle?.licensePlate} />
          )}
          {vehicle?.status && (
            <div className="flex items-center gap-1">
              <Text className="font-bold">Vehicle Status</Text>
              <Text>
                -
                {!isEditingStatus &&
                  VehicleStatus[vehicle.status as VehicleStatusKey]}
              </Text>
              {isEditingStatus && (
                <select
                  value={editedStatus}
                  onChange={handleStatusChange}
                  className="ml-2 p-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 transition ease-in-out duration-150"
                >
                  {Object.values(VehicleStatus).map((status) => (
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
                    onClick={() => setIsEditingStatus(false)}
                  >
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
          <Button
            className="w-[160px] mt-4 md:mr-24 absolute bottom-0"
            size="small"
            onClick={() => setIsVideosModalOpen(true)}
          >
            Update
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default TabletDetail;
