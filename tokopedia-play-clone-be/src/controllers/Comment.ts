import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Comment from "../models/Comment.js";

const createComment = async (req: Request, res: Response, next: NextFunction) => {
    const { video, username, content } = req.body

    const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        video, username, content
    })

    return await comment
        .save()
        .then((comment) => res.status(201).json({ comment }))
        .catch((error) => res.status(500).json({ error }))
}

const readComment = async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentId

    return await Comment.findById(commentId)
        .then((comment) => (comment ? res.status(201).json({ comment }) : res.status(404).json({ message: "Not found" })))
        .catch((error) => res.status(500).json({ error }))
}

const readAllComment = async (req: Request, res: Response, next: NextFunction) => {
    return await Comment.find()
        .then((comments) => res.status(201).json({ comments }))
        .catch((error) => res.status(500).json({ error }))
}

const updateComment = async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentId

    return await Comment.findByIdAndUpdate(commentId, req.body)
        .then((comment) => (comment ? res.status(201).json({ message: 'Updated', data: comment }) : res.status(404).json({ message: "Not found" })))
        .catch((error) => res.status(500).json({ error }))
}

const deleteComment = async (req: Request, res: Response, next: NextFunction) => { 
    const commentId = req.params.commentId

    return await Comment.findByIdAndDelete(commentId)
        .then((comment) => (comment ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: "Not found" })))
        .catch((error) => res.status(500).json({ error }))
}

export default { createComment, readComment, readAllComment, updateComment, deleteComment }