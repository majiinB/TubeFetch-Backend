import express, { Request, Response } from "express";
import ytdl from '@distube/ytdl-core';
import fs from 'fs';
import { VideoInfoRequest, DownloadResponse } from '../types/interfaces'


const router = express.Router();
const outputPath = 'D:/documents/TubeFetch/tubeFetchApi/downloads/video.mp4'

router.post('/', async (req: Request<{}, {}, VideoInfoRequest>, res: Response<DownloadResponse>) => {
    const { url } = req.body;

    try {
        const info = await ytdl.getInfo(url);
        const vidInfo = info.videoDetails;

        // Filter to get formats with both video and audio
        const formats = info.formats
            .filter(format => format.hasVideo && format.hasAudio) // Ensure both video and audio
            .sort((a, b) => {
                const heightA = a.height ?? 0; // Default to 0 if height is undefined
                const heightB = b.height ?? 0; // Default to 0 if height is undefined
                return heightB - heightA; // Sort by highest quality
            }); // Sort by quality in descending order


        // const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });
        console.log(formats);


        if (formats.length === 0) {
            console.error('No available video formats found');
            return res.status(404).json({ code: 'Error', message: 'No available video formats found' });
        }

        // Choose the lowest quality format
        const format = formats[0];


    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ code: 'Error', message: 'Failed to process request' });
    }
});

export default router;