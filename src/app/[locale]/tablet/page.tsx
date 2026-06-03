"use client";
import { FC, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import TabletDetailClient from "./[id]/TabletDetailClient";

const Tablets: FC = () => {
  const [tablets, setTablets] = useState<any>([]);
  const { get, loading } = useApi<any>();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTabletId = searchParams.get("id");

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

  const handleRowClick = (row: TabletWithAssignedVehiclesData) => {
    router.push(`${pathname}?id=${row.id}`);
  };

  const handleBackToTablets = () => {
    router.push(pathname);
  };

  return (
    <ProtectedRoute allowedRoles={[UserType.SUPER_ADMIN]}>
      {selectedTabletId ? (
        <TabletDetailClient
          tabletId={selectedTabletId}
          onBack={handleBackToTablets}
        />
      ) : (
        <PageContainer className="bg-white pb-20 lg:pb-40 pt-10">
          {loading ? (
            <TableSkeleton />
          ) : tablets.length > 0 ? (
            <Table
              columns={COLUMNS}
              data={tablets || []}
              className="overflow-x-auto whitespace-nowrap"
              onRowClick={handleRowClick}
            />
          ) : (
            <NoData />
          )}
        </PageContainer>
      )}
    </ProtectedRoute>
  );
};

export default Tablets;
