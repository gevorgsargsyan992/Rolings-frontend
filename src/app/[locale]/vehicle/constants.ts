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
  { key: "id", label: "ID", width: "5%" },
  { key: "status", label: "Status", width: "10%" },
  { key: "name", label: "Name", width: "25%" },
  { key: "color", label: "Color", width: "15%" },
  { key: "licensePlate", label: "Number Plate", width: "20%" },
  { key: "tabletId", label: "Tablet ID", width: "7%" },
];
