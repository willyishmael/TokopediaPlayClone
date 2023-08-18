import mongoose, { Document, Schema } from "mongoose";

export interface IVideo extends Document {
    video_url: string
    thumbnail_url: string
    title: string
}

export interface IVideoModel extends IVideo, Document { }

const VideoSchema: Schema = new Schema({
    video_url: { type: String, required: true },
    thumbnail_url: { type: String, required: true },
    title: { type: String, required: true }
})

export default mongoose.model<IVideoModel>('Video', VideoSchema)

