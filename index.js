import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"; 
import usersRoute from "./routes/users.js"; 
import hotelsRoute from "./routes/hotels.js"; 
import roomsRoute from "./routes/rooms.js"; 
import cookieParser from "cookie-parser";

// header('Access-Control-Allow-Origin: *');

// header('Access-Control-Allow-Methods: GET, POST');

// header("Access-Control-Allow-Headers: X-Requested-With");


const app = express();
dotenv.config(); 


const connect = async ()=>{

    try{
 
        await mongoose.connect(process.env.MONGO);
        
        // await  mongoose.connect("mongodb+srv://HotelHub:HotelHub@hotelbooking.xssrise.mongodb.net/?retryWrites=true&w=majority");
        
        console.log("Connected to mongoDB!")
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log("Mongo Db disconnected");
})
mongoose.connection.on("connected",()=>{
    console.log("mongoDB connected");
})


// middlewares for routes

app.use(cookieParser())


app.use(express.json());



app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);

app.use("/api/hotels",hotelsRoute);

app.use("/api/rooms",roomsRoute);


app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMsg = err.message || "Something went wrong! ";
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMsg,
        stack:err.stack
    })

})





app.listen(8800,()=>{
    connect()
    console.log("connected to backend at port 8800! ")
}
);