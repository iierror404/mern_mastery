import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
        required: true,
        default: "",
    },
    image: {
        type: String,
        default: "https://placehold.co/500x400"
    }
});

const Product = mongoose.model("Product", productSchema);

export default Product;

