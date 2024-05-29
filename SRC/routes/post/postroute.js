import express from "express";
const router = express.Router()
import {
    createPost,
    deleteAllPostsForASingleUser,
    deletePost,
    getAllPost,
    getSinglePost, likePost, unlikePost
} from "../../controllers/postController.js";
import protectedRoute from "../../middlewares/protectedroute.js";

router.get("/all", protectedRoute, getAllPost);
router.get("/single/:id",protectedRoute,getSinglePost);
router.delete("/delete/:id",protectedRoute,deletePost);
router.delete("/delete",protectedRoute,deleteAllPostsForASingleUser);
router.post("/like/:id",protectedRoute,likePost);
router.post("/unlike/:id",protectedRoute,unlikePost)
router.post('/add', protectedRoute, createPost);

export default router;