const express=require("express")
const mongoose=require("mongoose")
const cors = require("cors");
require("dotenv").config()
const app=express()
app.use(cors());
const UserRouter=require("./routers/userRouter")
const CarRouter=require("./routers/carRouter")
const dealRouter=require('./routers/dealRouter')
const leaseRouter=require("./routers/leaseRouter")
app.use(express.json())
app.get("/test", (req, res) => {
    res.send("Server is working");
});

app.use("/user",UserRouter)
app.use("/cars",CarRouter);
app.use("/deal",dealRouter)
app.use('/lease',leaseRouter)
mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log("Mongoose is connected successfully")
            app.listen(process.env.PORT,()=>{
                console.log(`App is listening on ${process.env.PORT}`)
            })
        })
        .catch((error)=>{
            console.log("Mongoose is not connected yet",error)
        })