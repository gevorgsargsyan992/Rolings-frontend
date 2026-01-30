import { VehicleStatus } from "@/app/[locale]/vehicle/constants";

export type VehicleStatusKey = keyof typeof VehicleStatus; // 1 | 2 | 3 | 4

export interface VehicleData {
  id: string;
  color: string;
  status: VehicleStatusKey;
  licensePlate: string;
  description: string;
  name: string;
  tabletId: string;
}
