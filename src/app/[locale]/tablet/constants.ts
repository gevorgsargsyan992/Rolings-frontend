import { Column } from "./types";

export const TabletStatus = {
  1: "Active",
  2: "NOT ACTIVE",
  3: "LIVE VIDEO",
  4: "STOPPED VIDEO",
};

export const COLUMNS: Column[] = [
  { key: "tabletStatus", label: "Status", width: "10%" },
  { key: "vehicleName", label: "Vehicle Name", width: "25%"  },
  { key: "vehicleLicensePlate", label: "License Plate", width: "15%"  },
  { key: "vehicleDescription", label: "Description", width: "25%"  },
  { key: "videoCount", label: "Video Count", width: "10%"  },
  { key: "lastActive", label: "Last Active", width: "15%"  },
];

export const COLUMNS_VIDEO: Column[] = [
  { key: "videoId", label: "ID", width: "15%" },
  { key: "videoName", label: "Video Name", width: "15%"  },
];
