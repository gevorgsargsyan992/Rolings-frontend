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
import { useRouter } from "next/navigation";

const Vehicles: FC = () => {
  const [vehicles, setVehicles] = useState<any>([]);
  const { get, loading } = useApi<any>();
  const router = useRouter();

  useEffect(() => {
    const fetchVehicles = async () => {
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
    };

    fetchVehicles();
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
            rowActions={[
              {
                label: "Edit",
                onClick: (row) => router.push(`${VEHICLE}/${row.id}`),
              },
            ]}
          />
        ) : (
          <NoData />
        )}
      </PageContainer>
    </ProtectedRoute>
  );
};

export default Vehicles;
