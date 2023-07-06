import Room from "../models/Rooms.js"
import Hotel from "../models/Hotels.js"
import {createError }from "../utils/error.js"

export const createRoom = async (req,res,next)=>{
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try{
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId,{
                $push:{rooms:savedRoom._id}
            });
            
        } catch (error) {
            next(error);
        }
        res.status(200).json(savedRoom);
    }
    catch(err){
        next(err);
    }

}

export const updateRoom = async (req,res,next)=>{


    try{
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new :true}); // it basically get id from the request params and we use mongodb set method to update the data and used new : true to set the updated data into the variable
        res.status(200).json("room status has been updated");
 
    }
    catch(err){
        next(err);
    }
}
export const updateRoomAvailbility = async (req,res,next)=>{


    try{
        await Room.updateOne(
            {
                "roomNumbers._id":req.params.id
            },
            {
                $push:{
                    "roomNumbers.$.unavailableDates":req.body.dates
                }
            }
        )
        res.status(200).json("room status has been updated");

 
    }
    catch(err){
        next(err);
    }
}
export const deleteRoom = async (req,res,next)=>{
    const hotelId = req.params.hotelid;
    try{
        await Room.findByIdAndDelete(req.params.id ); // it basically get id from the request params and we use mongodb set method to update the data and used new : true to set the updated data into the variable
        try {
            await Hotel.findByIdAndUpdate(hotelId,{
                $pull:{rooms:req.params.id}
            });
            
        } catch (error) {
            next(error);
        }
        res.status(200).json("Room has been deleted ");
    }
    catch(err){
        next(err);
    }
}

export const getRoom = async(req,res,next)=>{
    try{
        const getRoom = await Room.findById(req.params.id); // it basically get id from the request params and we use mongodb set method to update the data and used new : true to set the updated data into the variable
        res.status(200).json(getRoom);

    }
    catch(err){
        next(err);
    }
}
export const getRooms = async(req,res,next)=>{
    try{
        const allRoom = await Room.find(); // it basically get id from the request params and we use mongodb set method to update the data and used new : true to set the updated data into the variable
        res.status(200).json(allRoom);

    }
    catch(err){
        next(err);
    }

}

