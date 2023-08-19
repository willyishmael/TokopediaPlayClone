import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
    video: string
    username: string
    content: string
}

export interface ICommentModel extends IComment, Document { }

const CommentSchema: Schema = new Schema({
    video: { type: Schema.Types.ObjectId, required: true, ref: 'Video' },
    username: { type: String, required: true },
    content: { type: String, required: true }
}, { timestamps: true })

export default mongoose.model<ICommentModel>('Comment', CommentSchema)