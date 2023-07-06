import express from "express"
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailbility } from "../controller/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

// Create room
router.post("/:hotelid",verifyAdmin ,createRoom)

// UPDATE THE HOTEL INFO
router.put("/:id",verifyAdmin,updateRoom)

router.put("/availbility/:id",updateRoomAvailbility)

// DELETE THE HOTEL
router.delete("/:id/:hotelid",verifyAdmin,deleteRoom)

// GET A specific HOTEL

router.get("/:id",getRoom)

// GET ALL HOTELS

router.get("/",getRooms)



export default router