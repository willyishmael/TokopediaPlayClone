import { NextFunction, Request, Response } from "express";
import Logging from "../lib/Logging.js";

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    Logging.error(`Path: ${req.path}`);
    Logging.error(`Error occurred:\n${error}`);

    switch (error.name) {
        case `CastError`:
            res.status(400).send({ error: "Not a valid id" })
            break
        default:
            res.status(500).send({ error: "An internal server error occurred" });
            break
    }
}