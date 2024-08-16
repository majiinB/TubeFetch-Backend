import { videoFormat } from "@distube/ytdl-core";
export interface VideoInfo {
    title: String,
    ownerChannelName: String,
    videoId: String
    thumbnail: {
        url: String,
        width: number,
        height: number
    }
}

export interface VideoInfoRequest {
    url: string;
}
export interface InfoResponse {
    code: string;
    message: string;
    videoInfo?: VideoInfo,
    formats?: videoFormat[]
}