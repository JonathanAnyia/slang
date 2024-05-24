import express from "express";
import authRoute from './SRC/routes/auth/authRoute.js'
import userRoute from './SRC/routes/User/userroute.js'
import postroute from './SRC/routes/post/postroute.js';

const router = express.Router()

router.use('/auth', authRoute)
router.use('/user', userRoute)
router.use('/post', postroute)

export default router;