import {Column} from './types'

export const TabletStatus = {
    1: 'Active',
    2: 'NOT ACTIVE',
    3: 'LIVE VIDEO',
    4: 'STOPPED VIDEO',
}

export const COLUMNS: Column[]  = [
    { key: "createdAt", label: "Time" },
    { key: "tabletStatus", label: "Status" },
    { key: "tb_uuid", label: "UUID" },
    { key: "videoCount", label: "Video Count" }
];
