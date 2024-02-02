import mongoose, { Model, Schema } from "mongoose";
import { Customers } from "../../../domain/entities/customers";

const CustomerModel: Schema = new Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    address: { type: String, required: true },
    document: { type: Number, required: true },
    email: { type: String, required: true},
    phone: { type: Number, required: true },
    country: { type: String, required: true },
    password: { type: String, required: true },
})

const CustomersSchema =
    (mongoose.models.Customers as Model<Customers>) ||
    mongoose.model<Customers>("customers", CustomerModel);

export default CustomersSchema;