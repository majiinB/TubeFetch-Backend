/**
 * TubeFetch API - Utility Functions
 * 
 * @file utils.ts
 * @description This file contains utility functions for the TubeFetch API, including URL validation and video format type checking.
 * 
 * Functions:
 * 
 * - validateUrl(url: string): Checks if the provided YouTube URL is valid using `ytdl-core`.
 *   - @param {string} url - The YouTube URL to validate.
 *   - @returns {boolean} - Returns `true` if the URL is valid, `false` otherwise.
 * 
 * - isVideoFormat(obj: any): Type guard function that checks if an object is a `videoFormat` type.
 *   - @param {any} obj - The object to check.
 *   - @returns {boolean} - Returns `true` if the object matches the `videoFormat` structure, `false` otherwise.
 * 
 * Error Handling:
 * - The `validateUrl` function includes error handling to catch any exceptions thrown by `ytdl-core` and returns `false` if an error occurs.
 * 
 * Usage:
 * - These functions are primarily used in the `videoInfoRoute.ts` file to validate URLs and ensure correct typing of video formats.
 * 
 * @module utils
 * 
 * @author Arthur M. Artugue
 * @created 2024-08-10
 * @updated 2024-08-17
 */

import ytdl, { videoFormat } from '@distube/ytdl-core';
import fs from 'fs';

/**
 * Validates the provided YouTube URL.
 * 
 * @function validateUrl
 * @param {string} url - The YouTube URL to validate.
 * @returns {boolean} - Returns `true` if the URL is valid, `false` otherwise.
 * @throws {Error} - Catches and handles any errors from `ytdl-core`.
 */
export function validateUrl(url: string): boolean {
    let isValidUrl = false;
    try {
        isValidUrl = ytdl.validateURL(url);
        return isValidUrl;
    } catch (error) {
        return isValidUrl;
    }
}

/**
 * Type guard function to check if an object is of the `videoFormat` type.
 * 
 * @function isVideoFormat
 * @param {any} obj - The object to check.
 * @returns {boolean} - Returns `true` if the object matches the `videoFormat` structure, `false` otherwise.
 */
export function isVideoFormat(obj: any): obj is videoFormat {
    return typeof obj === 'object' &&
        obj !== null &&
        typeof obj.itag === 'number' &&
        typeof obj.url === 'string' &&
        typeof obj.hasVideo === 'boolean' &&
        typeof obj.hasAudio === 'boolean' &&
        (obj.mimeType === undefined || typeof obj.mimeType === 'string') &&
        (obj.qualityLabel === undefined || typeof obj.qualityLabel === 'string') &&
        (obj.bitrate === undefined || typeof obj.bitrate === 'number') &&
        (obj.audioBitrate === undefined || typeof obj.audioBitrate === 'number') &&
        (obj.width === undefined || typeof obj.width === 'number') &&
        (obj.height === undefined || typeof obj.height === 'number') &&
        (obj.lastModified === undefined || typeof obj.lastModified === 'string') &&
        (obj.quality === undefined || typeof obj.quality === 'string') &&
        (obj.fps === undefined || typeof obj.fps === 'number') &&
        (obj.projectionType === undefined || typeof obj.projectionType === 'string') &&
        (obj.audioQuality === undefined || typeof obj.audioQuality === 'string') &&
        (obj.approxDurationMs === undefined || typeof obj.approxDurationMs === 'string') &&
        (obj.audioSampleRate === undefined || typeof obj.audioSampleRate === 'string') &&
        (obj.audioChannels === undefined || typeof obj.audioChannels === 'number') &&
        (obj.container === undefined || typeof obj.container === 'string') &&
        (obj.codecs === undefined || typeof obj.codecs === 'string') &&
        (obj.videoCodec === undefined || typeof obj.videoCodec === 'string') &&
        (obj.audioCodec === undefined || typeof obj.audioCodec === 'string') &&
        (obj.isLive === undefined || typeof obj.isLive === 'boolean') &&
        (obj.isHLS === undefined || typeof obj.isHLS === 'boolean') &&
        (obj.isDashMPD === undefined || typeof obj.isDashMPD === 'boolean');
}


export async function download(url: string, format: videoFormat) {
    const outputPath = 'D:/documents/TubeFetch/tubeFetchApi/downloads/video.mp4'

    try {
        if (!format) {
            console.error('No available video formats found');
            throw new Error("mali format");
            //return res.status(404).json({ code: 'Error', message: 'No available video formats found' });
        }

        // Log the selected format
        console.log('Selected format:', format);

        // Create a write stream to save the video
        const fileStream = fs.createWriteStream(outputPath);

        // Create a video stream with the selected format
        const videoStream = ytdl(url, { format });

        let downloadedBytes = 0;
        let totalBytes = 0;

        // Track progress
        videoStream.on('progress', (chunkLength, downloaded, total) => {
            downloadedBytes = downloaded;
            totalBytes = total;
            const percent = (downloadedBytes / totalBytes) * 100;
            console.log(`Downloaded: ${percent.toFixed(2)}%`);
        });

        // Pipe the video stream to the file
        videoStream.pipe(fileStream);

        // Event listener for completion
        fileStream.on('finish', () => {
            console.log(`Video downloaded successfully to ${outputPath}`);

            // Send response
            // const responseBody: DownloadResponse = {
            //     code: 'Success',
            //     message: 'Video downloaded successfully',
            // };

            //res.status(200).json(responseBody);
        });

        // Event listener for errors
        videoStream.on('error', (err) => {
            console.error('Download error:', err);
            //res.status(500).json({ code: 'Error', message: 'Failed to download video' });
        });

        fileStream.on('error', (err) => {
            console.error('File write error:', err);
            //res.status(500).json({ code: 'Error', message: 'Failed to write file' });
        });
    } catch (error) {
        console.error('Error:', error);
        //res.status(500).json({ code: 'Error', message: 'Failed to process request' });
    }
}