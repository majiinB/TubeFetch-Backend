/**
 * TubeFetch API
 * 
 * @file app.ts
 * @description This is the main entry point for the TubeFetch API. It sets up the Express application,
 * 
 * Routes:
 * - /videoInfo: Handles videoInfo-related requests.
 * 
 * Middleware:
 * - express.json(): Parses incoming request bodies in JSON format.
 * - errorHandler: Custom error handler middleware to log errors and return a 422 Unprocessable Entity response.
 * 
 * Functions:
 * - errorHandler: Middleware function for error handling.
 * 
 * Server:
 * - Listens on port 8080.
 * 
 * To start the server, run this file. The server will listen on the specified port.
 * 
 * @module app
 * 
 * @author Arthur M. Artugue
 * @created 2024-08-10
 * @updated 2024-08-17
 */

import express, { Request, Response, NextFunction } from 'express';
import info from './routes/videoInfoRoute';
import cors from 'cors';

const PORT = 8080;
const app = express();

// FUNCTIONS

/**
 * Error handler middleware.
 * Logs the error stack trace for debugging and returns a 422 Unprocessable Entity response.
 *
 * @param {Error} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {Function} next - The next middleware function.
 */
function errorHandler(err: Error | null, req: Request, res: Response, next: NextFunction) {
    //console.error(err.stack); // Log the error stack trace for debugging
    res.status(422).json({
        error: 'Unprocessable Entity, check your request data'
    });
}

// MIDDLEWARE
app.use(cors({
    origin: 'http://localhost:3000' // Replace with frontend URL
}));
app.use(express.json());
app.use(errorHandler);

// END POINTS

/**
 * Routes for handling videoInfo-related requests.
 * All routes under '/videoInfo' will be handled by videoInfoRoute.
 */
app.use('/videoInfo', info);

// FIRE UP THE API
app.listen(PORT, () => {
    console.log(`TubeFetch API is now listening to http://localhost:${PORT}`);
});