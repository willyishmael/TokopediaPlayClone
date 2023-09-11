import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Comment from "../models/Comment.js";

const createComment = async (req: Request, res: Response, next: NextFunction) => {
    const { video, username, content } = req.body

    const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        video, username, content
    })

    return await comment.save()
        .then((comment) => res.status(201).json({ message: `Created`, data: comment }))
        .catch((error) => next(error))
}

const readComment = async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params

    return await Comment.findById(commentId)
        .then((comment) => comment
            ? res.status(201).json({ data: comment })
            : res.status(404).json({ error: "Not found" }))
        .catch((error) => next(error))
}

const readAllCommentByVideoId = async (req: Request, res: Response, next: NextFunction) => {
    const { videoId } = req.params

    return await Comment.find({ video: videoId })
        .then((comments) => comments
            ? res.status(201).json({ data: comments })
            : res.status(404).json({ error: `Not found` }))
        .catch((error) => next(error))
}

const readAllComment = async (req: Request, res: Response, next: NextFunction) => {
    return await Comment.find()
        .then((comments) => res.status(201).json({ data: comments }))
        .catch((error) => next(error))
}

const updateComment = async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params

    return await Comment.findByIdAndUpdate(commentId, req.body)
        .then((comment) => comment
            ? res.status(201).json({ message: 'Updated', data: comment })
            : res.status(404).json({ error: "Not found" }))
        .catch((error) => next(error))
}

const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params

    return await Comment.findByIdAndDelete(commentId)
        .then((comment) => comment
            ? res.status(201).json({ message: 'Deleted' })
            : res.status(404).json({ error: "Not found" }))
        .catch((error) => next(error))
}

export default { createComment, readComment, readAllCommentByVideoId, readAllComment, updateComment, deleteComment }