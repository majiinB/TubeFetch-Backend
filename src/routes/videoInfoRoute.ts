/**
 * TubeFetch API - Video Information Route
 * 
 * @file videoInfoRoute.ts
 * @description This file contains the route handler for the `/videoInfo` endpoint. 
 *              It retrieves video information from a provided YouTube URL using `ytdl-core`.
 * 
 * Route:
 * - POST /videoInfo: Retrieves video information and formats based on the provided YouTube URL.
 * 
 * Middleware:
 * - express.json(): Parses incoming request bodies in JSON format.
 * 
 * Functions:
 * - validateUrl: Validates the YouTube URL format.
 * 
 * Error Handling:
 * - 404: Returned if the URL is invalid or if no available video formats are found.
 * - 500: Returned if there is a server error while processing the request.
 * 
 * @module videoInfoRoute
 * 
 * @author Arthur M. Artugue
 * @created 2024-08-10
 * @updated 2024-09-02
 */

import express, { Request, Response } from "express";
import ytdl, { videoFormat } from '@distube/ytdl-core';
import { validateUrl } from '../functions/utils';
import { VideoInfoRequest, InfoResponse, VideoInfo } from '../types/interfaces'

const router = express.Router();

// Route handler for POST /videoInfo
router.post('/', async (req: Request<{}, {}, VideoInfoRequest>, res: Response<InfoResponse>) => {
    const { url } = req.body;

    // Validate the provided YouTube URL
    if (!validateUrl(url) || !url) {
        return res.status(404).json({ code: 'invalid_url', message: 'Invalid url please try again' });
    }

    try {
        // Fetch video information using ytdl-core
        const info = await ytdl.getInfo(url);
        const videoDetails = info.videoDetails;

        // Extract necessary video details
        const extractedVideoDetails: VideoInfo = {
            title: videoDetails.title,
            ownerChannelName: videoDetails.ownerChannelName,
            videoId: videoDetails.videoId,
            thumbnail: {
                url: videoDetails.thumbnails[0].url,
                width: videoDetails.thumbnails[0].width,
                height: videoDetails.thumbnails[0].height
            }
        }

        // Filter and sort video formats to get those with both video and audio
        const formats: videoFormat[] = info.formats
            .filter(format => format.hasVideo && format.hasAudio) // Ensure both video and audio
            .sort((a, b) => {
                const heightA = a.height ?? 0; // Default to 0 if height is undefined
                const heightB = b.height ?? 0; // Default to 0 if height is undefined
                return heightB - heightA; // Sort by highest quality
            });

        // Handle case where no valid formats are found
        if (formats.length === 0) {
            return res.status(404).json({ code: 'no_available_format', message: 'No available video formats found' });
        }

        // Construct the response object
        const InfoResponse: InfoResponse = {
            code: 'information_found',
            message: 'Information about the video is successfully found',
            videoInfo: extractedVideoDetails,
            formats: formats
        }

        // Return the response with status 200
        return res.status(200).json(InfoResponse);

    } catch (error) {
        // Handle server errors
        console.error('Error:', error); // For debugging
        res.status(500).json({ code: 'internal_server_error', message: 'Failed to process request' });
    }
});

export default router;
