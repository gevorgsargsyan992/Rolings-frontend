"use client";
import React, { FC, useEffect, useState } from "react";
import Table from "@/components/Table";
import useApi from "@/hooks/useApi";
import { COLUMNS } from "./constants";
import { USER } from "@/apiConstants";
import NoData from "@/components/NoData";
import PageContainer from "@/components/PageContainer";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { UserType } from "@/types/UserTypes";
import { TableSkeleton } from "@/components/Skeleton";

const Tablets: FC = () => {
  const [users, setUsers] = useState<any>([]);
  const { get, loading } = useApi<any>();

  useEffect(() => {
    const fetchTablets = async () => {
      try {
        const data = await get(`${USER}`);
        if (data?.length) {
          setUsers(data);
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
      <PageContainer className="bg-white pb-40 pt-10">
        {loading ? (
          <TableSkeleton />
        ) : users.length > 0 ? (
          <div className="flex flex-col">
            <Table
              columns={COLUMNS}
              data={users || []}
              url="video"
              className="overflow-x-auto whitespace-nowrap"
              isRowClickable={false}
            />
          </div>
        ) : (
          <NoData />
        )}
      </PageContainer>
    </ProtectedRoute>
  );
};

export default Tablets;
