import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import { config } from './config/config.js';
import Logging from './lib/Logging.js';
import videoRouter from './routers/Video.js';
import commentRouter from './routers/Comment.js';
import productRouter from './routers/Product.js';
import cors from 'cors';
import { errorHandler } from './middlewares/ErrorHandler.js';

const app = express();

mongoose
    .connect(config.mongodb.uri)
    .then(() => { Logging.info('Connected to MongoDB'); startServer(); })
    .catch((error) => { Logging.error('Failed connecting to MongoDB'); Logging.error(error) })

function startServer() {
    /** Middleware */
    app.use(cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
        allowedHeaders: ['Content-Type'],
        credentials: true
    }))

    /** Request Logger */
    app.use((req, res, next) => {
        Logging.info(`[REQUEST] -> Method: [${req.method}] -> Url: [${req.url}] -> IP: [${req.socket.remoteAddress}]`)

        res.on('finish', () => {
            Logging.info(`[REQUEST] -> Method: [${req.method}] -> Url: [${req.url}] -> IP: [${req.socket.remoteAddress}] -> Status: [${res.statusCode}]`)
        })

        next()
    })

    /** API Rules */
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    /** Router */
    app.use('/video', videoRouter, errorHandler)
    app.use('/comment', commentRouter, errorHandler)
    app.use('/product', productRouter, errorHandler)

    /** Ping */
    app.get('/ping', (req, res) => res.status(200).json({ message: 'Yoo, whats up!' }))

    /** Error Handling */
    app.use((req, res) => {
        Logging.error(`[${req.method}] [${req.url}] Request not available`)
        res.status(404).json({ error: 'Request not available' });
    });

    /** Create Server */
    const port = config.server.port
    http.createServer(app)
        .listen(port, () => { Logging.info(`Server running at PORT ${port}`) })
        .on('error', (error) => { Logging.error(error) })
}