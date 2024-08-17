/**
 * TubeFetch API - TypeScript Interfaces
 * 
 * @file interfaces.ts
 * @description This file contains TypeScript interfaces used in the TubeFetch API, defining the structure of data related to video information requests and responses.
 * 
 * Interfaces:
 * 
 * - VideoInfo: Represents detailed information about a YouTube video.
 *   - @property {String} title - The title of the video.
 *   - @property {String} ownerChannelName - The name of the channel that owns the video.
 *   - @property {String} videoId - The unique identifier of the video.
 *   - @property {Object} thumbnail - Contains details about the video's thumbnail image.
 *     - @property {String} url - The URL of the thumbnail image.
 *     - @property {number} width - The width of the thumbnail image.
 *     - @property {number} height - The height of the thumbnail image.
 * 
 * - VideoInfoRequest: Represents the structure of a request to fetch video information.
 *   - @property {string} url - The YouTube URL for which video information is requested.
 * 
 * - InfoResponse: Represents the structure of a response containing video information and available formats.
 *   - @property {string} code - The status code indicating the result of the request (e.g., 'information_found', 'invalid_url').
 *   - @property {string} message - A descriptive message corresponding to the status code.
 *   - @property {VideoInfo} [videoInfo] - The video information, provided if the request is successful.
 *   - @property {videoFormat[]} [formats] - An array of available video formats, provided if the request is successful.
 * 
 * Usage:
 * - These interfaces are used throughout the TubeFetch API to ensure that request and response data structures are consistent and well-defined.
 * 
 * @module interfaces
 * 
 * @author Arthur M. Artugue
 * @created 2024-08-10
 * @updated 2024-08-17
 */

import { videoFormat } from "@distube/ytdl-core";

/**
 * Represents detailed information about a YouTube video.
 * 
 * @interface VideoInfo
 * @property {String} title - The title of the video.
 * @property {String} ownerChannelName - The name of the channel that owns the video.
 * @property {String} videoId - The unique identifier of the video.
 * @property {Object} thumbnail - Contains details about the video's thumbnail image.
 * @property {String} url - The URL of the thumbnail image.
 * @property {number} width - The width of the thumbnail image.
 * @property {number} height - The height of the thumbnail image.
 */
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

/**
 * Represents the structure of a request to fetch video information.
 * 
 * @interface VideoInfoRequest
 * @property {string} url - The YouTube URL for which video information is requested.
 */
export interface VideoInfoRequest {
    url: string;
}

/**
 * Represents the structure of a response containing video information and available formats.
 * 
 * @interface InfoResponse
 * @property {string} code - The status code indicating the result of the request (e.g., 'information_found', 'invalid_url').
 * @property {string} message - A descriptive message corresponding to the status code.
 * @property {VideoInfo} [videoInfo] - The video information, provided if the request is successful.
 * @property {videoFormat[]} [formats] - An array of available video formats, provided if the request is successful.
 */
export interface InfoResponse {
    code: string;
    message: string;
    videoInfo?: VideoInfo,
    formats?: videoFormat[]
}
