const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const cors = require("cors");
const path = require('path')
dotenv.config()
mongoose
.connect(process.env.MONGO_URL)
.then(()=>{console.log('DB Connection  Succesfull!')})
.catch((err)=>{console.log(err)})

app.use(cors()) // Use this after the variable declaration
app.use(express.json())
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/products",productRoute)
app.use("/api/carts",cartRoute)
app.use("/api/orders",orderRoute)
app.use(express.static(path.join(__dirname,"../client/build/index.html")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../client/build/index.html"))
    console.log('fronted connected');
})

app.listen(process.env.PORT || 5000,()=>{
    console.log("Backend server is running ", process.env.PORT || 5000);
})
