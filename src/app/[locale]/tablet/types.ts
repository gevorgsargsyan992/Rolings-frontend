import { TabletStatus } from "@/app/[locale]/tablet/constants";

export interface Column {
  key: string;
  label: string;
  width: string;
}

export type TabletStatusKey = keyof typeof TabletStatus; // 1 | 2 | 3 | 4

export interface TabletData {
  id: string;
  createdAt: string;
  tabletStatus: TabletStatusKey;
  tb_uuid: string;
  videoCount: number;
}

export interface TabletWithAssignedVehiclesData {
  id: string;
  lastActive: string;
  tabletStatus: TabletStatusKey;
  vehicleDescription: string;
  vehicleLicensePlate: string;
  vehicleName: string;
  videoCount: number;
}
