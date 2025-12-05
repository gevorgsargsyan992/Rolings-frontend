import { Column } from "./types";

export const VehicleStatus = {
  1: "Active",
  2: "Not Active",
};

export const VehicleColors = {
  "Black": "Black",
  "White": "White",
  "Red": "Red",
  "Blue": "Blue",
  "Brown": "Brown",
  "Gray": "Gray",
  "Silver": "Silver",
  "Gold": "Gold",
  "Green": "Green",
  "Yellow": "Yellow",
  "Orange": "Orange",
};

export const COLUMNS: Column[] = [
  { key: "id", label: "ID" },
  { key: "status", label: "Status" },
  { key: "name", label: "Name" },
  { key: "color", label: "Color" },
  { key: "licensePlate", label: "Number Plate" },
  { key: "tabletId", label: "Tablet ID" },
];
