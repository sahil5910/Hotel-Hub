import User from "../models/Users.js";



export const updateUser = async (req,res,next)=>{


    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new :true}); // it basically get id from the request params and we use mongodb set method to update the data and used new : true to set the updated data into the variable
        res.status(200).json(updatedUser);
 
    }
    catch(err){
        next(err);
    }
}

export const deleteUser = async (req,res,next)=>{


    try{
        await User.findByIdAndDelete(req.params.id ); // it basically get id from the request params and we use mongodb set method to update the data and used new : true to set the updated data into the variable
        res.status(200).json("User has been deleted ");
    }
    catch(err){
        next(err);
    }
}

export const getUser = async(req,res,next)=>{
    try{
        const getUser = await User.findById(req.params.id); // it basically get id from the request params and we use mongodb set method to update the data and used new : true to set the updated data into the variable
        res.status(200).json(getUser);

    }
    catch(err){
        next(err);
    }
}
export const getUsers = async(req,res,next)=>{
    try{
        const allUser = await User.find(); // it basically get id from the request params and we use mongodb set method to update the data and used new : true to set the updated data into the variable
        res.status(200).json(allUser);

    }
    catch(err){
        next(err);
    }

}
