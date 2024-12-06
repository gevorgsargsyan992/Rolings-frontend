import { Column } from "./types";

export const VehicleStatus = {
  1: "Active",
  2: "NOT ACTIVE",
};

export const COLUMNS: Column[] = [
  { key: "id", label: "ID" },
  { key: "status", label: "Status" },
  { key: "name", label: "Name" },
  { key: "color", label: "Color" },
  { key: "licensePlate", label: "Number plate" },
  { key: "tabletId", label: "Tablet Id" },
];

export const COLUMNS_VIDEO: Column[] = [
  { key: "videoId", label: "ID" },
  { key: "videoName", label: "Video Name" },
];
