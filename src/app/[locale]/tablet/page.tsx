"use client";
import { FC, useEffect, useState } from "react";
import Table from "@/components/Table";
import useApi from "@/hooks/useApi";
import { COLUMNS, TabletStatus } from "./constants";
import { TabletStatusKey, TabletWithAssignedVehiclesData } from "./types";
import { TABLET } from "@/apiConstants";
import { formattedDate } from "@/utils";
import NoData from "@/components/NoData";
import PageContainer from "@/components/PageContainer";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { UserType } from "@/types/UserTypes";
import { TableSkeleton } from "@/components/Skeleton";

const Tablets: FC = () => {
  const [tablets, setTablets] = useState<any>([]);
  const { get, loading } = useApi<any>();

  useEffect(() => {
    const fetchTablets = async () => {
      try {
        const data = await get(`${TABLET}/tablets-with-assigned-vehicles`);
        if (data?.length) {
          const tabletsToShow = data.map(
            (tablet: TabletWithAssignedVehiclesData) => ({
              ...tablet,
              lastActive:
                tablet?.lastActive && formattedDate(tablet.lastActive),
              tabletStatus:
                TabletStatus[tablet.tabletStatus as TabletStatusKey],
            }),
          );
          setTablets(tabletsToShow);
        }
      } catch (err) {
        console.error("Error fetching tablets:", err);
      }
    };

    fetchTablets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProtectedRoute allowedRoles={[UserType.SUPER_ADMIN]}>
      <PageContainer className="bg-white pb-20 lg:pb-40 pt-10">
        {loading ? (
          <TableSkeleton />
        ) : tablets.length > 0 ? (
          <Table
            columns={COLUMNS}
            data={tablets || []}
            url="tablet"
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
