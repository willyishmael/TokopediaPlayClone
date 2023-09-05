import { NextFunction, Request, Response } from "express";
import Logging from "../lib/Logging";

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    Logging.error(`Path: ${req.path}`);
    Logging.error(`Error occurred:\n${error}`);

    res.status(500).send({
        message: "An internal server error occurred. Please try again later."
    });
}