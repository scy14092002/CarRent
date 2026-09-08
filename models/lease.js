const mongoose=require("mongoose")

const leaseSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    car:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Car",
        required:true
    }
    ,deal:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Deal",
        required:true

    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true

    }
    ,status:{
        type:String,
        enum:["pending","active","completed","rejected","cancelled"],
        default:"pending"
    },
},{timestamps:true})

module.exports=mongoose.model("Lease",leaseSchema)