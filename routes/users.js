import express from "express"
import { deleteUser, getUser, getUsers, updateUser } from "../controller/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();




// UPDATE THE User INFO
router.put("/:id",verifyUser,updateUser)
// DELETE THE User
router.delete("/:id",verifyUser,deleteUser)

// GET A specific User

router.get("/:id",verifyUser,getUser)

// GET ALL UserS

router.get("/",verifyAdmin,getUsers)


export default router