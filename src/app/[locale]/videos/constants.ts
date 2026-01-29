import { Column } from "./types";

export const VideoStatus = {
    1: "Active",
    2: "NOT ACTIVE",
};

export const COLUMNS: Column[] = [
    { key: "id", label: "ID", width: "5%" },
    { key: "status", label: "Status", width: "10%" },
    { key: "url", label: "URL", link: true, width: "15%" },
    { key: "name", label: "Name", width: "25%" },
    { key: "createdAt", label: "Time", width: "15%" },
];

