"use client";
import { FC, useEffect, useState } from "react";
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

const Tablets: FC = () => {
  const [vehicles, setVehicles] = useState<any>([]);
  const { get, loading } = useApi<any>();

  useEffect(() => {
    const fetchTablets = async () => {
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
        console.error("Error fetching tablets:", err);
      }
    };

    fetchTablets();
  }, []);

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
          />
        ) : (
          <NoData />
        )}
      </PageContainer>
    </ProtectedRoute>
  );
};

export default Tablets;
