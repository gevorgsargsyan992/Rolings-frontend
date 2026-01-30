import { Column } from "@/types/columns";

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
  { key: "name", label: "Name", width: "20%" },
  { key: "licensePlate", label: "Number Plate", width: "10%" },
  { key: "description", label: "Description", width: "30%" },
  { key: "color", label: "Color", width: "5%" },
  { key: "tabletId", label: "Tablet ID", width: "5%" },
];
