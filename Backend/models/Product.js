const mongoose=require("mongoose");
const productschema=new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
            trim: true,
        },
        brand: {
            type: String,
            trim: true,
        },
        category:{
            type: String,
            trim: true,
        },
        ecoScore: {
            type: Number,
            min: 0,
            max: 100,
            default: 50,
        },
        isEcofriendly:{
            type: Boolean,
            default: false,
        },
    },
    {timestamps: true}
);
module.exports =mongoose.model("Product",productSchema);