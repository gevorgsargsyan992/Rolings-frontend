"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import Table from "@/components/Table";
import useApi from "@/hooks/useApi";
import { COLUMNS, VehicleColors, VehicleStatus } from "./constants";
import { VehicleData, VehicleStatusKey } from "./types";
import { VEHICLE, TABLET } from "@/apiConstants";
import NoData from "@/components/NoData";
import PageContainer from "@/components/PageContainer";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { UserType } from "@/types/UserTypes";
import { TableSkeleton } from "@/components/Skeleton";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Typography from "@/components/Typography";

const { Text } = Typography;

const Vehicles: FC = () => {
  const [vehicles, setVehicles] = useState<any>([]);
  const [originalVehicles, setOriginalVehicles] = useState<any>([]);
  const { _delete, get, post, patch, put, loading } = useApi<any>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [editingVehicleId, setEditingVehicleId] = useState<string | null>(null);
  const [tablets, setTablets] = useState<any[]>([]);
  const [createLoading, setCreateLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    licensePlate: "",
    color: "",
    name: "",
    description: "",
    status: "",
    tabletId: "",
  });

  const fetchVehicles = useCallback(async () => {
    try {
      const data = await get(`${VEHICLE}`);
      if (data?.count) {
        // Store original data with numeric status
        setOriginalVehicles(data?.result || []);
        // Map status to display string
        const vehiclesToShow = data?.result?.map((vehicle: VehicleData) => ({
          ...vehicle,
          status: VehicleStatus[vehicle.status as VehicleStatusKey],
        }));
        setVehicles(vehiclesToShow);
      }
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    }
  }, [get]);

  const fetchTablets = useCallback(async () => {
    try {
      const data = await get(`${TABLET}`);
      setTablets(data || []);
    } catch (err) {
      console.error("Error fetching tablets:", err);
    }
  }, [get]);

  useEffect(() => {
    fetchVehicles();
    fetchTablets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickDelete = useCallback((row: any) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  }, []);

  const onClickEdit = useCallback(
    (row: any) => {
      // Find the original vehicle data with numeric status
      const originalVehicle = originalVehicles.find(
        (v: VehicleData) => v.id === row.id
      );
      console.log("originalVehicle", originalVehicle);
      if (originalVehicle) {
        setEditingVehicleId(originalVehicle.id);
        setFormData({
          licensePlate: originalVehicle.licensePlate || "",
          color: originalVehicle.color || "",
          name: originalVehicle.name || "",
          description: originalVehicle.description || "",
          status: String(originalVehicle.status) || "",
          tabletId: originalVehicle.tabletId || "",
        });
        setIsCreateModalOpen(true);
      }
    },
    [originalVehicles]
  );

  const onModalConfirm = useCallback(async () => {
    const { id } = selectedRow || {};
    if (id) {
      try {
        const response = (await _delete(`${VEHICLE}/${id}`)) || {};
        if (response?.success) {
          await fetchVehicles();
          setIsDeleteModalOpen(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [_delete, fetchVehicles, selectedRow]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateVehicle = useCallback(async () => {
    const { licensePlate, color, name, description, status, tabletId } = formData;

    // Validate required fields
    if (!licensePlate || !color || !name || !status) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setCreateLoading(true);
      const isEditing = editingVehicleId !== null;

      if (isEditing) {
        // Edit mode - use PATCH
        const originalVehicle = originalVehicles.find(
          (v: VehicleData) => v.id === editingVehicleId
        );
        const originalTabletId = originalVehicle?.tabletId || "";

        // Update tabletId if changed
        if (originalTabletId !== tabletId) {
          await put(`${VEHICLE}/${editingVehicleId}`, {
            tabletId: tabletId ? +tabletId : 0,
            action: tabletId ? "UPDATE" : "REMOVE",
          });
        }

        // Update vehicle details
        await patch(`${VEHICLE}/${editingVehicleId}`, {
          licensePlate,
          color,
          name,
          description,
          status: +status,
        });

        // If no error thrown, close modal and refetch
        setEditingVehicleId(null);
        setFormData({
          licensePlate: "",
          color: "",
          description: "",
          name: "",
          status: "",
          tabletId: "",
        });
        setIsCreateModalOpen(false);
        await fetchVehicles();
      } else {
        // Create mode - use POST
        const payload: any = {
          licensePlate,
          color,
          name,
          description,
          status: +status,
        };

        // Add tabletId only if provided (optional field)
        if (tabletId) {
          payload.tabletId = +tabletId;
        }

        const response = (await post(`${VEHICLE}`, payload)) || {};
        if (response?.success) {
          // Reset form
          setFormData({
            licensePlate: "",
            color: "",
            name: "",
            description: "",
            status: "",
            tabletId: "",
          });
          setIsCreateModalOpen(false);
          await fetchVehicles();
        }
      }
    } catch (err) {
      console.error(
        `Error ${editingVehicleId ? "updating" : "creating"} vehicle:`,
        err
      );
      alert(
        `Failed to ${editingVehicleId ? "update" : "create"} vehicle. Please try again.`
      );
    } finally {
      setCreateLoading(false);
    }
  }, [
    formData,
    post,
    patch,
    put,
    fetchVehicles,
    editingVehicleId,
    originalVehicles,
  ]);

  return (
    <ProtectedRoute allowedRoles={[UserType.SUPER_ADMIN]}>
      <PageContainer className="bg-white pb-40 pt-10">
        <div className="mb-4 flex justify-end">
          <Button onClick={() => setIsCreateModalOpen(true)}>
            Create Vehicle
          </Button>
        </div>
        {loading ? (
          <TableSkeleton />
        ) : vehicles.length > 0 ? (
          <Table
            columns={COLUMNS}
            data={vehicles || []}
            url="vehicle"
            className="overflow-x-auto whitespace-nowrap"
            isRowClickable={false}
            rowActions={[
              {
                label: "Edit",
                onClick: (row) => onClickEdit(row),
              },
              {
                label: "Delete",
                onClick: (row) => onClickDelete(row),
              },
            ]}
          />
        ) : (
          <NoData />
        )}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          subtitle="Do you want to delete?"
          onConfirm={onModalConfirm}
        />
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false);
            setEditingVehicleId(null);
            setFormData({
              licensePlate: "",
              color: "",
              name: "",
              description: "",
              status: "",
              tabletId: "",
            });
          }}
          showButtons={false}>
          <div className="flex flex-col gap-4 px-5 py-4">
            <div className="text-left mb-2">
              <Text bold className="text-2xl">
                {editingVehicleId ? "Edit Vehicle" : "Create Vehicle"}
              </Text>
            </div>
            <div>
              <Text bold className="mb-2">
                Number Plate *
              </Text>
              <Input
                type="text"
                placeholder="Enter number plate"
                value={formData.licensePlate}
                onChange={(e) =>
                  handleInputChange("licensePlate", e.target.value)
                }
              />
            </div>
            <div>
              <Text bold className="mb-2">
                Name *
              </Text>
              <Input
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div>
              <Text bold className="mb-2">
                Description
              </Text>
              <Input
                type="text"
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>
            <div>
              <Text bold className="mb-2">
                Color *
              </Text>
              <select
                value={formData.color}
                onChange={(e) => handleInputChange("color", e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-gray-700 bg-white focus:outline-none focus:ring-2">
                <option value="">Select color</option>
                {Object.entries(VehicleColors).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Text bold className="mb-2">
                Status *
              </Text>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-gray-700 bg-white focus:outline-none focus:ring-2">
                <option value="">Select Status</option>
                {Object.entries(VehicleStatus).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Text bold className="mb-2">
                Tablet ID
              </Text>
              <select
                value={formData.tabletId}
                onChange={(e) => handleInputChange("tabletId", e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-gray-700 bg-white focus:outline-none focus:ring-2">
                <option value="">Select Tablet</option>
                {tablets.map((tablet) => (
                  <option key={tablet.id} value={tablet.id}>
                    {tablet.id}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-4 justify-between pt-4 border-t border-gray-300">
              <Button
                type="ghost"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setEditingVehicleId(null);
                  setFormData({
                    licensePlate: "",
                    color: "",
                    name: "",
                    description: "",
                    status: "",
                    tabletId: "",
                  });
                }}
                className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleCreateVehicle}
                loading={createLoading}
                className="flex-1 min-w-20">
                {editingVehicleId ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </Modal>
      </PageContainer>
    </ProtectedRoute>
  );
};

export default Vehicles;
