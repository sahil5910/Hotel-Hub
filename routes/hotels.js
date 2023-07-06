import express from "express"
import Hotel from "../models/Hotels.js";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRoom, getHotels, updateHotel } from "../controller/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();


// Create hotel
router.post("/",verifyAdmin,createHotel)

// UPDATE THE HOTEL INFO
router.put("/:id",verifyAdmin,updateHotel)
// DELETE THE HOTEL
router.delete("/:id",verifyAdmin,deleteHotel)

// GET A specific HOTEL 

router.get("/find/:id",getHotel)

// GET ALL HOTELS

router.get("/",getHotels)

router.get("/countByCity",countByCity)
router.get("/countByType",countByType)
router.get("/room/:id",getHotelRoom)


export default router