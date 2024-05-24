import express from "express";
const router = express.Router()
import { deleteAllUsers,deleteSingleUser,getAllUsers,getSingleUser,updateUser } from "../../controllers/usercontroller.js";
import protectedroute from "../../middlewares/protectedroute.js";

router.get("/",protectedroute , getAllUsers)
router.get("/:id",getSingleUser)
router.delete("/delete",protectedroute , deleteAllUsers)
router.patch('/update/:id', updateUser)
router.delete("/delete/:id",protectedroute , deleteSingleUser)

export default router;