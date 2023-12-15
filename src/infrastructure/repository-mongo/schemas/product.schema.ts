import mongoose, { Model, Schema } from "mongoose";
import { Products } from "../../../domain/entities/products";

const ProductsModel: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true }
});

const ProductsSchema =
    (mongoose.models.Products as Model<Products>) ||
    mongoose.model<Products>("products", ProductsModel);

export default ProductsSchema;