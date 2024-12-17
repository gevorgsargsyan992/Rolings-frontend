"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import Table from "@/components/Table";
import useApi from "@/hooks/useApi";
import { COLUMNS, VehicleStatus } from "./constants";
import { VehicleData, VehicleStatusKey } from "./types";
import { VEHICLE } from "@/apiConstants";
import NoData from "@/components/NoData";
import PageContainer from "@/components/PageContainer";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { UserType } from "@/types/UserTypes";
import { TableSkeleton } from "@/components/Skeleton";
import Modal from "@/components/Modal";

const Vehicles: FC = () => {
  const [vehicles, setVehicles] = useState<any>([]);
  const { _delete, get, loading } = useApi<any>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const fetchVehicles = useCallback(async () => {
    try {
      const data = await get(`${VEHICLE}`);
      if (data?.count) {
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

  useEffect(() => {
    fetchVehicles();
  }, []);

  const onClickDelete = useCallback((row: any) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  }, []);

  const onModalConfirm = useCallback(async () => {
    const { id } = selectedRow || {};
    if (id) {
      try {
        const response = (await _delete(`${VEHICLE}/${id}`)) || {};
        if (response?.success) {
          await fetchVehicles();
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [_delete, fetchVehicles, selectedRow]);

  return (
    <ProtectedRoute allowedRoles={[UserType.SUPER_ADMIN]}>
      <PageContainer className="bg-white pb-40 pt-10">
        {loading ? (
          <TableSkeleton />
        ) : vehicles.length > 0 ? (
          <Table
            columns={COLUMNS}
            data={vehicles || []}
            url="vehicle"
            className="overflow-x-auto whitespace-nowrap"
            rowActions={[
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
      </PageContainer>
    </ProtectedRoute>
  );
};

export default Vehicles;
