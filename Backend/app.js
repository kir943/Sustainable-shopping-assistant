const express=require("express");
const cors=require("cors");
const connectDB=require("./config/db");
require("dotenv").config();

const productRoutes=require("./routes/product.routes");
const app=express();

connectDB();

app.use(cors());
app.use(express.json());
//test route 
app.use("/api/products",productRoutes);
app.get("/",(req,res)=>{
    res.send("Sustainavle shopping assiatant Api is running");
});
module.exports=app;