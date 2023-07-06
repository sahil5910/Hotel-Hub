import mongoose from "mongoose"


const HotelSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    
    distance:{
        type:String,
        required:true
    },
    photos:{
        type:[String] // array of addresses of the images
    },
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    
    rating:{
        type:Number,
        min:0,
        max:5
    },
    rooms:{
        type:[String], // have id's of the rooms so we need to take arrays of string
    },
    cheapestPrice:{
        type:Number,
        required:true,
    },
    // we need to show some special hotels to the user
    featured:{
        type:Boolean,
        default:false,
    }
     






})


export default mongoose.model("Hotel",HotelSchema);