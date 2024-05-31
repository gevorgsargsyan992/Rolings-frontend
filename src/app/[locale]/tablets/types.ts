import {TabletStatus} from "@/app/[locale]/tablets/constants";

export interface Column {
    key: string;
    label: string;
}

export type TabletStatusKey = keyof typeof TabletStatus; // 1 | 2 | 3 | 4

export interface TabletData {
    createdAt: string;
    tabletStatus: TabletStatusKey;
    tb_uuid: string;
    videoCount: number;
}
