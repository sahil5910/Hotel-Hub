import Hotel from "../models/Hotels.js";
import Room from "../models/Rooms.js"

export const createHotel = async(req,res,next)=>{
    const newHotel = new Hotel(req.body);

    try{
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
 
    }
    catch(err){
        next(err);
    }
}

export const updateHotel = async (req,res,next)=>{


    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new :true}); // it basically get id from the request params and we use mongodb set method to update the data and used new : true to set the updated data into the variable
        res.status(200).json(updatedHotel);
 
    }
    catch(err){
        next(err);
    }
}

export const deleteHotel = async (req,res,next)=>{


    try{
        await Hotel.findByIdAndDelete(req.params.id ); // it basically get id from the request params and we use mongodb set method to update the data and used new : true to set the updated data into the variable
        res.status(200).json("Hotel has been deleted ");
    }
    catch(err){
        next(err);
    }
}

export const getHotel = async(req,res,next)=>{
    try{
        const getHotel = await Hotel.findById(req.params.id); // it basically get id from the request params and we use mongodb set method to update the data and used new : true to set the updated data into the variable
        res.status(200).json(getHotel);

    }
    catch(err){
        next(err);
    }
}
export const getHotels = async(req,res,next)=>{
    const {min,max,limit,...others} = req.query;
    try{
        const allHotel = await Hotel.find({...others,cheapestPrice:{$gt:min|0,$lt:max|9999999}}).limit(limit); // it basically get id from the request params and we use mongodb set method to update the data and used new : true to set the updated data into the variable
        res.status(200).json(allHotel);

    }
    catch(err){
        next(err);
    }

}
export const countByCity = async(req,res,next)=>{
    // console.log(req.query.cities);
    const cities = req.query.cities.split(",");
    try{
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city});
        }))
        res.status(200).json(list);

    }
    catch(err){
        next(err);
    }

}

export const countByType = async(req,res,next)=>{
    
    
    try{
        const hotelCount = await Hotel.countDocuments({type:"hotel"});
    const apartmentCount = await Hotel.countDocuments({type:"apartment"});
    const resortCount = await Hotel.countDocuments({type:"resort"});
    const villaCount = await Hotel.countDocuments({type:"villa"});
    const cabinCount = await Hotel.countDocuments({type:"cabin"});
        res.status(200).json([
            {type:"hotel",count:hotelCount},
            {type:"apartment",count:apartmentCount},
            {type:"resort",count:resortCount},
            {type:"villa",count:villaCount},
            {type:"cabin",count:cabinCount}
            
        ]);

    }
    catch(err){
        next(err);
    }

}

export const getHotelRoom = async (req,res,next)=>{
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(hotel.rooms.map(room=>{
            return Room.findById(room);
        }))
        res.status(200).json(list);

    } catch (error) {
        next(error)
    }

}