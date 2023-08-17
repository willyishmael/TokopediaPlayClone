import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import { config } from './config/config.js';
import Logging from './lib/Logging.js';
import router from './routers/router.js';

const app = express();
Logging.info(config.mongodb.uri)
mongoose
    .connect(config.mongodb.uri)
    .then(() => { Logging.info('Connected to MongoDB'); startServer(); })
    .catch((error) => { Logging.error('Failed connecting to MongoDB'); Logging.error(error) })

function startServer() {
    app.use((req, res, next) => {
        Logging.info(`[REQUEST] -> Method: [${req.method}] -> Url: [${req.url}] -> IP: [${req.socket.remoteAddress}]`)

        res.on('finish', () => {
            Logging.info(`[REQUEST] -> Method: [${req.method}] -> Url: [${req.url}] -> IP: [${req.socket.remoteAddress}] -> Status: [${res.statusCode}]`)
        })

        next()
    })

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    /** Routes */
    app.use(router)

    /** Ping */
    app.get('/ping', (req, res) => res.status(200).json({ message: 'Yoo, whats up!' }))

    /** Error Handling */
    app.use((req, res) => {
        res.status(404).json({ error: 'Not Found' });
    });

    const port = config.server.port
    http.createServer(app)
        .listen(port, () => { Logging.info(`Server running on PORT ${port}`) })
        .on('error', (error) => { Logging.error(error) })
}