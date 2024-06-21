"use client";
import { FC, useEffect, useState } from "react";
import Table from "@/components/Table";
import useApi from "@/hooks/useApi";
import { COLUMNS, TabletStatus } from "./constants";
import { TabletData, TabletStatusKey } from "./types";
import { TABLET } from "@/apiConstants";
import { formattedDate } from "@/utils";
import NoData from "@/components/NoData";

const Tablets: FC = () => {
  const [tablets, setTablets] = useState<any>([]);
  const { loading, error, get } = useApi<any>();

  useEffect(() => {
    const fetchTablets = async () => {
      try {
        const data = await get(`${TABLET}`);
        if (data?.length) {
          const tabletsToShow = data.map((tablet: TabletData) => ({
            ...tablet,
            createdAt: formattedDate(tablet?.createdAt),
            tabletStatus: TabletStatus[tablet.tabletStatus as TabletStatusKey],
          }));
          setTablets(tabletsToShow);
        }
      } catch (err) {
        console.error("Error fetching tablets:", err);
      }
    };

    fetchTablets();
  }, []);

  return tablets.length > 0 ? (
    <Table columns={COLUMNS} data={tablets || []} url="tablet" />
  ) : (
    <NoData />
  );
};

export default Tablets;
