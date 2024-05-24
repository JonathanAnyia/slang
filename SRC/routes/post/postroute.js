import express from "express";
const router = express.Router()
import { createPost } from "../../controllers/postController.js";
import protectedRoute from "../../middlewares/protectedroute.js";

router.post('/add, protectedRoute, createPost');

export default router;