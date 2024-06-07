"use client";
import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import Typography from "@/components/Typography";
import { TABLET } from "@/apiConstants";
import { TabletData, TabletStatusKey } from "@/app/[locale]/tablet/types";
import { formattedDate } from "@/utils";
import { COLUMNS, TabletStatus } from "@/app/[locale]/tablet/constants";
import useApi from "@/hooks/useApi";
import Table from "@/components/Table";
import NoData from "@/components/NoData";

const { Text } = Typography;

interface TabletProps {
  tablet: {
    id: string;
    name: string;
    description: string;
  };
}

const TabletDetail: FC<TabletProps> = () => {
  const [tablet, setTablet] = useState<any>([]);
  const { id } = useParams();
  const { loading, error, get } = useApi<any>();

  useEffect(() => {
    const fetchTablets = async () => {
      try {
        const data = await get(`${TABLET}/${id}`);

        if (data?.length) {
          const tabletsToShow = data.map((tablet: TabletData) => ({
            ...tablet,
            createdAt: formattedDate(tablet?.createdAt),
            tabletStatus: TabletStatus[tablet.tabletStatus as TabletStatusKey],
          }));
          setTablet(tabletsToShow);
        }
      } catch (err) {
        console.error("Error fetching tablets:", err);
      }
    };

    fetchTablets();
  }, []);

  return tablet.length > 0 ? (
    <Table columns={COLUMNS} data={tablet || []} isRowEdit />
  ) : (
    <NoData />
  );
};

export default TabletDetail;
