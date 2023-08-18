import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Video from "../models/Video.js";

const createVideo = async (req: Request, res: Response, next: NextFunction) => {
    const { title, video_url, thumbnail_url } = req.body

    const video = new Video({
        _id: new mongoose.Types.ObjectId(),
        title, video_url, thumbnail_url
    })

    return await video
        .save()
        .then((video) => res.status(201).json({ video }))
        .catch((error) => res.status(500).json({ error }))
}

const readVideo = async (req: Request, res: Response, next: NextFunction) => {
    const videoId = req.params.videoId

    return await Video.findById(videoId)
        .then((video) => (video ? res.status(201).json({ video }) : res.status(404).json({ message: "Not found" })))
        .catch((error) => res.status(500).json({ error }))
}

const readAllVideo = async (req: Request, res: Response, next: NextFunction) => {
    return await Video.find()
        .then((videos) => res.status(201).json({ videos }))
        .catch((error) => res.status(500).json({ error }))
}

const updateVideo = async (req: Request, res: Response, next: NextFunction) => {
    const videoId = req.params.videoId

    return await Video.findByIdAndUpdate(videoId, req.body)
        .then((video) => (video ? res.status(201).json({ message: 'Updated', data: video }) : res.status(404).json({ message: "Not found" })))
        .catch((error) => res.status(500).json({ error }))
}

const deleteVideo = async (req: Request, res: Response, next: NextFunction) => { 
    const videoId = req.params.videoId

    return await Video.findByIdAndDelete(videoId)
        .then((video) => (video ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: "Not found" })))
        .catch((error) => res.status(500).json({ error }))
}

export default { createVideo, readVideo, readAllVideo, updateVideo, deleteVideo }