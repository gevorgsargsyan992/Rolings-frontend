import { VehicleStatus } from "@/app/[locale]/vehicle/constants";

export interface Column {
  key: string;
  label: string;
  width: string;
}

export type VehicleStatusKey = keyof typeof VehicleStatus; // 1 | 2 | 3 | 4

export interface VehicleData {
  id: string;
  color: string;
  status: VehicleStatusKey;
  licensePlate: string;
  name: string;
  tabletId: string;
}
