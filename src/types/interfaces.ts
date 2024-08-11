
export interface VideoFormat {
    mimeType?: string;
    qualityLabel?: string;
    bitrate?: number;
    audioBitrate?: number;
    itag: number;
    url: string;
    width?: number;
    height?: number;
    lastModified?: string;
    quality?: string;
    fps?: number;
    projectionType?: string;
    audioQuality?: string;
    approxDurationMs?: string;
    audioSampleRate?: string;
    audioChannels?: number;
    hasVideo: boolean;
    hasAudio: boolean;
    container?: string;
    codecs?: string;
    videoCodec?: string;
    audioCodec?: string;
    isLive?: boolean;
    isHLS?: boolean;
    isDashMPD?: boolean;
}

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
    format?: VideoFormat
}