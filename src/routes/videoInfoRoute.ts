import express, { Request, Response } from "express";
import ytdl, { videoFormat } from '@distube/ytdl-core';
import { download, validateUrl } from '../functions/utils';
import { VideoInfoRequest, InfoResponse, VideoInfo } from '../types/interfaces'

const router = express.Router();

router.post('/', async (req: Request<{}, {}, VideoInfoRequest>, res: Response<InfoResponse>) => {
    const { url } = req.body;

    if (!validateUrl(url) || !url) {
        return res.status(404).json({ code: 'Invalid_url', message: 'Invalid url please try again' });
    }

    try {
        const info = await ytdl.getInfo(url);
        const videoDetails = info.videoDetails;

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

        // Filter to get formats with both video and audio
        const formats = info.formats
            .filter(format => format.hasVideo && format.hasAudio) // Ensure both video and audio
            .sort((a, b) => {
                const heightA = a.height ?? 0; // Default to 0 if height is undefined
                const heightB = b.height ?? 0; // Default to 0 if height is undefined
                return heightB - heightA; // Sort by highest quality
            }); // Sort by quality in descending order

        if (formats.length === 0) {
            console.error('No available video formats found');
            return res.status(404).json({ code: 'Error', message: 'No available video formats found' });
        }

        // Choose the highest quality format
        const format: videoFormat[] = formats;
        console.log(format);

        const InfoResponse: InfoResponse = {
            code: 'information_found',
            message: 'Information about the video is successfully found',
            videoInfo: extractedVideoDetails,
            formats: format
        }

        //download(url, format[0]);
        return res.status(200).json(InfoResponse)

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ code: 'Error', message: 'Failed to process request' });
    }
});

export default router;