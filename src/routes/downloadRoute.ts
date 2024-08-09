import express, { Router, Request, Response } from "express";

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

router.post('/', async (req: Request<{}, {}, VideoDownloadRequest>, res: Response<DownloadResponse>) => {
    const { url, quality } = req.body;

    const DownlaodResponseBody: DownloadResponse = {
        code: 'Success',
        message: 'test',
    };

    res.status(200).json(DownlaodResponseBody);
});

export default router;