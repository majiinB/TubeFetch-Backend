import express, { Request, Response } from "express";
import ytdl from '@distube/ytdl-core';
import fs from 'fs';

interface VideoDownloadRequest {
    url: string;
    quality: string;
}

interface DownloadResponse {
    code: string;
    message: string;
    details?: string;
}

const router = express.Router();
const outputPath = 'D:/documents/TubeFetch/tubeFetchApi/downloads/video.mp4'

router.post('/', async (req: Request<{}, {}, VideoDownloadRequest>, res: Response<DownloadResponse>) => {
    const { url, quality } = req.body;

    try {
        const info = await ytdl.getInfo(url);

        // Filter to get formats with both video and audio
        // const formats = info.formats
        //     .filter(format => format.hasVideo && format.hasAudio) // Ensure both video and audio
        // // .sort((a, b) => {
        // //     const heightA = a.height ?? 0; // Default to 0 if height is undefined
        // //     const heightB = b.height ?? 0; // Default to 0 if height is undefined
        // //     return heightB - heightA; // Sort by highest quality
        // // }); // Sort by quality in descending order


        // const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });
        // console.log(format);


        // if (formats.length === 0) {
        //     console.error('No available video formats found');
        //     return res.status(404).json({ code: 'Error', message: 'No available video formats found' });
        // }

        // // Choose the lowest quality format
        // const format = formats[formats.length - 1];

        // Define a function to get the format by quality label
        const getFormatByQuality = (qualityLabel: string) => {
            return info.formats.find(format => format.qualityLabel === qualityLabel);
        };

        // Choose format based on the requested quality
        let format = info.formats.find(format => format.hasVideo && format.hasAudio);

        if (quality === '1080p') {
            format = getFormatByQuality('1080p');
        } else if (quality === 'medium') {
            format = getFormatByQuality('720p');
        } else {
            format = info.formats
                //.filter(f => f.hasVideo && f.hasAudio)
                .reduce((best, current) => (current.height ?? 0) > (best.height ?? 0) ? current : best);
        }

        if (!format) {
            console.error('No available video formats found');
            return res.status(404).json({ code: 'Error', message: 'No available video formats found' });
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
            const responseBody: DownloadResponse = {
                code: 'Success',
                message: 'Video downloaded successfully',
            };

            res.status(200).json(responseBody);
        });

        // Event listener for errors
        videoStream.on('error', (err) => {
            console.error('Download error:', err);
            res.status(500).json({ code: 'Error', message: 'Failed to download video' });
        });

        fileStream.on('error', (err) => {
            console.error('File write error:', err);
            res.status(500).json({ code: 'Error', message: 'Failed to write file' });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ code: 'Error', message: 'Failed to process request' });
    }
});

export default router;