import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import {createError} from "../utils/error.js"
import jwt from "jsonwebtoken"


export const register = async(req,res,next)=>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
            
        })
        await newUser.save();
        res.status(201).send("user has been created !");
    } catch (error) {
        next(error);
    }
}

export const login = async(req,res,next)=>{
    try {
        const user =await User.findOne({username:req.body.username});
        if (!user) return next(createError(404,"User NOt Found"));

        const isPasswordCorrect = await bcrypt.compareSync(req.body.password  , user.password);

        if (!isPasswordCorrect)return next(createError(400,"Wrong Password or username"));

        // creating token for user after successfullt logged in 
        const token = jwt.sign({id:user._id ,isAdmin:user.isAdmin},process.env.JWT)
        // de-structuring our user and getting all details other than password and isAdmin

        const {password , isAdmin , ...otherDetails} = user._doc;

    //    send the jwt webtoken through cookie
        res.cookie("access_token",token,{
            httpOnly:true, // doesn't allow any client secret to reach this cookie
        }).status(201).json({...otherDetails});
    } catch (error) {
        next(error);
    }
}