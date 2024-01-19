import mongoose, { Schema } from "mongoose";

const products = new Schema({
    "name" : {
        type : String,
        required : true
    },
    "price" : {
        type : Number,
        required : true
    },
    "description" : {
        type : String,
        required : true
    },
    "slug" : {
        type : String,
        unique : true,
        required : true
    },
    "categoryId" : {
        type : mongoose.Schema.Types.ObjectId,
        ref :  "Category"
    }
})

export default mongoose.model("Products" , products)