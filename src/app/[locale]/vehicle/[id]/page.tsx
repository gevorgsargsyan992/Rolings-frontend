"use client";
import { useParams } from "next/navigation";
import React, { FC, useEffect, useState, useCallback } from "react";
import Typography from "@/components/Typography";
import { TABLET, VEHICLE } from "@/apiConstants";
import { VehicleStatusKey } from "@/app/[locale]/vehicle/types";
import { VehicleStatus } from "../constants";
import useApi from "@/hooks/useApi";
import Button from "@/components/Button";
import PageContainer from "@/components/PageContainer";

const { Text } = Typography;

const VehicleDetail: FC = () => {
  const [vehicle, setVehicle] = useState<any>({});
  const [tablets, setTablets] = useState<any[]>([]);
  const [selectedTablet, setSelectedTablet] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const { get, patch, put } = useApi<any>();

  useEffect(() => {
    fetchVehicle();
    fetchTablets();
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

        // Check if the vehicle has a tablet ID and set it
        if (vehicleData.tabletId) {
          setSelectedTablet(vehicleData.tabletId);
        } else {
          setSelectedTablet(""); // No tablet connected
        }
      }
    } catch (err) {
      console.error("Error fetching vehicle:", err);
    }
  }, [id, get]);

  const fetchTablets = useCallback(async () => {
    try {
      const tabletsData = await get(`${TABLET}`);
      setTablets(tabletsData || []);
    } catch (err) {
      console.error("Error fetching tablets:", err);
    }
  }, [get]);

  const handleInputChange = (field: string, value: string) => {
    setVehicle((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const { licensePlate, name, status, color } = vehicle;
      await put(`${VEHICLE}/${id}`, {
        tabletId: +selectedTablet,
        action: "UPDATE",
      });
      await patch(`${VEHICLE}/${id}`, {
        licensePlate,
        name,
        status,
        color,
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving changes:", err);
    }
  };

  return (
    <PageContainer className="bg-white pb-40 pt-10">
      <div className="flex flex-col relative h-full">
        <div className="mb-10">
          <div className="mt-4">
            <Text bold className="text-lg mb-4">
              Tablet Details
            </Text>
            <div className="flex flex-col gap-4">
              <div className="flex">
                <Text bold className="self-center">
                  Name:
                </Text>
                {isEditing ? (
                  <input
                    type="text"
                    value={vehicle?.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="ml-2 p-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2"
                  />
                ) : (
                  <Text className="ml-2">{vehicle?.name || ""}</Text>
                )}
              </div>
              <div className="flex">
                <Text bold className="self-center">
                  Color:
                </Text>
                {isEditing ? (
                  <input
                    type="text"
                    value={vehicle?.color || ""}
                    onChange={(e) => handleInputChange("color", e.target.value)}
                    className="ml-2 p-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2"
                  />
                ) : (
                  <Text className="ml-2">{vehicle?.color || ""}</Text>
                )}
              </div>
              <div className="flex">
                <Text bold className="self-center">
                  License Plate:
                </Text>
                {isEditing ? (
                  <input
                    type="text"
                    value={vehicle?.licensePlate || ""}
                    onChange={(e) =>
                      handleInputChange("licensePlate", e.target.value)
                    }
                    className="ml-2 p-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2"
                  />
                ) : (
                  <Text className="ml-2">{vehicle?.licensePlate || ""}</Text>
                )}
              </div>
              <div className="flex">
                <Text bold className="self-center">
                  Tablet Connected:
                </Text>
                {isEditing ? (
                  <select
                    value={selectedTablet}
                    onChange={(e) => setSelectedTablet(e.target.value)}
                    className="ml-2 p-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2"
                  >
                    <option value="">Select Tablet</option>
                    {tablets.map((tablet) => (
                      <option key={tablet.id} value={tablet.id}>
                        {tablet.id}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Text className="ml-2">
                    {selectedTablet || "No tablet connected"}
                  </Text>
                )}
              </div>
              <div className="flex">
                <Text bold className="self-center">
                  Vehicle Status:
                </Text>
                {isEditing ? (
                  <select
                    value={vehicle?.status || ""}
                    onChange={(e) =>
                      handleInputChange("status", e.target.value)
                    }
                    className="ml-2 p-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2"
                  >
                    {Object.keys(VehicleStatus).map((key) => (
                      <option key={key} value={key}>
                        {VehicleStatus[key as VehicleStatusKey]}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Text className="ml-2">
                    {VehicleStatus[vehicle?.status as VehicleStatusKey] || ""}
                  </Text>
                )}
              </div>
            </div>
            <div className="mt-8 flex gap-4">
              {isEditing ? (
                <>
                  <Button onClick={handleSaveChanges}>Save</Button>
                  <Button type="ghost" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Edit</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default VehicleDetail;
