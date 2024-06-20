"use client";
import { useParams } from "next/navigation";
import React, { FC, useEffect, useState, useCallback } from "react";
import Typography from "@/components/Typography";
import { TABLET } from "@/apiConstants";
import { TabletStatusKey } from "@/app/[locale]/tablet/types";
import { formattedDate } from "@/utils";
import { TabletStatus, COLUMNS_VIDEO } from "@/app/[locale]/tablet/constants";
import { TabletProps } from "./types";
import useApi from "@/hooks/useApi";
import Table from "@/components/Table";
import NoData from "@/components/NoData";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

const { Text } = Typography;

const TabletDetail: FC<TabletProps> = () => {
  const [tablet, setTablet] = useState<any>({});
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedStatus, setEditedStatus] = useState<string>(
    tablet?.tablet || ""
  );
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const { id } = useParams();
  const { loading, error,patch, get, _delete } = useApi<any>();

  useEffect(() => {
    setIsModalOpen(false);
  }, [isModalOpen]);

  useEffect(() => {
    fetchTablets();
  }, [tablet]);

  const fetchTablets = useCallback(async () => {
    try {
      const data = await get(`${TABLET}/${id}`);

      if (data?.length) {
        const [tabletData] = data;
        const tabletsToShow = {
          ...tabletData,
          createdAt: formattedDate(tabletData?.createdAt),
          tabletStatus:
              TabletStatus[tabletData.tabletStatus as TabletStatusKey],
        };
        setTablet({...tabletsToShow});
        setEditedStatus(
            TabletStatus[tabletData.tabletStatus as TabletStatusKey]
        );
      }
    } catch (err) {
      console.error("Error fetching tablets:", err);
    }
  },[get, id, tablet]) ;

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedStatus(event.target.value);
  };

  const handleSaveStatus = async () => {
    try {
      const updatedStatusKey = Object.keys(TabletStatus).find(
          (key) =>
              TabletStatus[key as unknown as TabletStatusKey] === editedStatus
      );

      await patch(`${TABLET}/${id}`, {
        status: +updatedStatusKey,
      });

      setTablet((prev) => ({
        ...prev,
        tabletStatus: editedStatus,
      }));

      setIsEditingStatus(false);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const onModalConfirm = useCallback(async () => {
    const { tabletVideoId } = selectedRow || {};
    if (tabletVideoId) {
      try {
        const response = await _delete(`${TABLET}/${tabletVideoId}`) || {};
        if(response?.success) {
          await fetchTablets();
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [_delete, fetchTablets, selectedRow]);

  const onClickDelete = useCallback((row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  }, []);

  console.log('tablet>>>', tablet)

  return tablet ? (
    <div className='flex flex-col'>
      <div className='mb-10'>
        <div className="flex mb-2 gap-1">
          <Text level={6} color="text-black" className="bold">ID</Text>
          <Text level={6}>{` - ${tablet?.id}`}</Text>
        </div>
        <div className="flex mb-2 gap-1">
          <Text level={6} color="text-black" className="bold">UUID</Text>
          <Text level={6}>{` - ${tablet?.tb_uuid}`}</Text>
        </div>
        <div className="flex mb-2 gap-1">
          <Text level={6} color="text-black" className="bold">Creation Time</Text>
          <Text level={6}> - {formattedDate(tablet?.createdAt)}</Text>
        </div>
        <div className="flex items-center gap-1">
          <Text color='text-black' level={6} className='bold'>
            Tablet Status
          </Text>
          <Text level={6}>
            - {!isEditingStatus && tablet?.tabletStatus}
          </Text>
          {isEditingStatus && (
            <select
              value={editedStatus}
              onChange={handleStatusChange}
              className="ml-2 p-1 border border-gray-300 rounded"
            >
              {Object.values(TabletStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          )}
          {isEditingStatus ? (
            <div className="flex gap-2 ml-4">
              <Button onClick={handleSaveStatus}>Save</Button>
              <Button type="ghost" onClick={() => setIsEditingStatus(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              type="text"
              className="ml-2"
              size='small'
              onClick={() => setIsEditingStatus(true)}
            >
              Edit
            </Button>
          )}
        </div>
      </div>
      {tablet?.videos?.length ? (
        <Table
          data={tablet?.videos || []}
          columns={COLUMNS_VIDEO}
          isRowClickable={false}
          rowActions={[
            {
              label: "Delete",
              onClick: (row) => onClickDelete(row),
            },
          ]}
        />
      ) : (
        <NoData message="No Videos Available"/>
      )}
      <Button className='mt-12 w-[160px] self-end mr-24' size='small' onClick={() => {
        //TODO:
      }}>Add New</Button>
      <Modal
        isOpen={isModalOpen}
        subtitle="Do you want to delete?"
        onConfirm={onModalConfirm}
      />
    </div>
  ) : (
    <NoData />
  );
};

export default TabletDetail;


