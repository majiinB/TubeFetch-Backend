import { validateUrl, isVideoFormat } from "../src/functions/utils";
import request from 'supertest';
import express, { Express } from 'express';
import ytdl from "@distube/ytdl-core";
import videoInfoRoute from '../src/routes/videoInfoRoute'

test("validate url", () => {
    expect(validateUrl("da;lfkjdaf")).toBe(false);
    expect(validateUrl("https://youtu.be/Sq-lO1CmaDs?si=ZFG0KxJsfhvfPXhH")).toBe(true);
})

test("validate if the object given is a videoFormat", () => {
    const fail = {
        fail: ""
    }

    const success = {
        "mimeType": "video/mp4; codecs=\"avc1.42001E, mp4a.40.2\"",
        "qualityLabel": "360p",
        "bitrate": 692884,
        "audioBitrate": 96,
        "itag": 18,
        "url": "https://rr5---sn-n3tj5cax-hoay.googlevideo.com/videoplayback?expire=1723715387&ei=23q9ZrzrArqc1d8PirzEmQw&ip=2404%3A3c00%3A794f%3Ad7c0%3Abc62%3A2e31%3A9a8c%3A142f&id=o-APmwoJT8RmiIy4U2oH-ow4JVRgsCiks2Lve_IJR_WybD&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=K8&mm=31%2C29&mn=sn-n3tj5cax-hoay%2Csn-n3tj5cax-hoaz&ms=au%2Crdu&mv=m&mvi=5&pl=36&initcwndbps=1248750&spc=Mv1m9swITKCNIrIUBYfamOWfWVEl_gTuWTdnMzPa0c9QPNi7GwGOZwVPtziB&vprv=1&svpuc=1&mime=video%2Fmp4&rqh=1&cnr=14&ratebypass=yes&dur=121.347&lmt=1697405596351835&mt=1723693278&fvip=3&c=ANDROID&txp=5538434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIgTBf9xcALMURSKaKd77-yuAHQDIyl1KwboPFLntNPpWoCIQDb6uZdxlkjFQWGLGLuy1s70LgYjtgzSOoaMStfe_Comg%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AGtxev0wRAIgabZn-kcQ-cbqWus2bxpAZLHwgpmH17xpyofAQuYPJoMCICfL_XsotYyeYasjTLhrXBPVtW3FqkizVStreZsyjaub",
        "width": 640,
        "height": 360,
        "lastModified": "1697405596351835",
        "quality": "medium",
        "fps": 30,
        "projectionType": "RECTANGULAR",
        "audioQuality": "AUDIO_QUALITY_LOW",
        "approxDurationMs": "121347",
        "audioSampleRate": "44100",
        "audioChannels": 2,
        "hasVideo": true,
        "hasAudio": true,
        "container": "mp4",
        "codecs": "avc1.42001E, mp4a.40.2",
        "videoCodec": "avc1.42001E",
        "audioCodec": "mp4a.40.2",
        "isLive": false,
        "isHLS": false,
        "isDashMPD": false
    }

    expect(isVideoFormat(fail)).toBe(false)
    expect(isVideoFormat(success)).toBe(true)
})

describe('POST /videoInfo', () => {
    let app: Express;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.use('/videoInfo', videoInfoRoute);
    });

    it('should return 200', async () => {
        const response = await request(app)
            .post('/videoInfo')
            .send({ url: 'https://youtu.be/Sq-lO1CmaDs?si=ZFG0KxJsfhvfPXhH' });

        expect(response.status).toBe(200);
    });

    it('should return 404', async () => {
        const response = await request(app)
            .post('/videoInfo')
            .send({ url: 'https://youtu.be/Sq' });

        expect(response.status).toBe(404);
    });
});