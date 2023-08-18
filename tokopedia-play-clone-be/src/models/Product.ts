import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
    video: string
    image_url: string
    title: string
    price: number
}

export interface IProductModel extends IProduct, Document { }

const ProductSchema: Schema = new Schema({
    video: { type: Schema.Types.ObjectId, required: true, ref: 'Video'},
    image_url: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true }
})

export default mongoose.model<IProductModel>('Product', ProductSchema)