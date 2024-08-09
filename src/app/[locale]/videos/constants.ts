import { Column } from "./types";

export const VideoStatus = {
    1: "Active",
    2: "NOT ACTIVE",
};

export const COLUMNS: Column[] = [
    { key: "id", label: "ID" },
    { key: "status", label: "Status" },
    { key: "url", label: "URL", link: true },
    { key: "name", label: "Name" },
    { key: "createdAt", label: "Time" },
];

