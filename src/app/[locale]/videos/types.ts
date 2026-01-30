import { VideoStatus } from "@/app/[locale]/videos/constants";

export type VideoStatusKey = keyof typeof VideoStatus; // 1 | 2

export interface VideosData {
    id: string;
    createdAt: string;
    status: VideoStatusKey;
    name: string;
    url: string;
}
