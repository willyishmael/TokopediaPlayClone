import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Product from "../models/Product.js";

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { video, image_url, title, price } = req.body

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        video, image_url, title, price
    })

    return await product
        .save()
        .then((product) => res.status(201).json({ message: `Created`, data: product }))
        .catch((error) => next(error))
}

const readProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params

    return await Product.findById(productId)
        .then((product) => product
            ? res.status(201).json({ data: product })
            : res.status(404).json({ error: "Not found" }))
        .catch((error) => next(error))
}

const readAllProduct = async (req: Request, res: Response, next: NextFunction) => {
    return await Product.find()
        .then((products) => res.status(201).json({ data: products }))
        .catch((error) => next(error))
}

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params

    return await Product.findByIdAndUpdate(productId, req.body)
        .then((product) => product
            ? res.status(201).json({ message: 'Updated', data: product })
            : res.status(404).json({ error: "Not found" }))
        .catch((error) => next(error))
}

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params

    return await Product.findByIdAndDelete(productId)
        .then((product) => product
            ? res.status(201).json({ message: 'Deleted' })
            : res.status(404).json({ error: "Not found" }))
        .catch((error) => next(error))
}

export default { createProduct, readProduct, readAllProduct, updateProduct, deleteProduct }