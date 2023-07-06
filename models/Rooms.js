import mongoose from "mongoose"


const RoomSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    maxPeople:{
        type:Number,
        required:true,
    },
    desc:{
        type:String,
        required:true
    },
    roomNumbers:[{number:Number,unavailableDates:{type:[Date]}}],// there might be the case that some rooms have same title desc ... so we just make an array of all these rooms also it includes dats on which these rooms are not available
    
},{
    timestamps:true
})


export default mongoose.model("Room",RoomSchema);