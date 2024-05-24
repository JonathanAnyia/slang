import User from "../models/user.model.js";
import Post from "../models/postmodels.js";
import express from "express";
import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv";
dotenv.config();


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:  process.env.CLOUDINARY_API_KEY,
    api_secret:  process.env.CLOUDINARY_API_SECRETE
});

export const createPost = async ()  =>{
    try{
        const {postedBy, text} = req.body;
        let {img} = req.body

        
        if (!posttedby || text) {
            return resizeBy.status(400).json({error: "postedBy and text fields are required"})
        }

        const user = await User.findById(postedBY);
        if (!user) {
            return resizeBy.status(400).json({error: "User not found"})
        }
        if (user.id.toString() !== req.user._id.toString()){
            return resizeBy.status(404).json({error: "Unauthorised"})
        }
        const maxlenth = 1000;
        if (text > maxlenth) {
            return resizeBy.status(404).json({error: `text should not exceed ${maxlenth} characters`});
        }
        if (img) {
            const uploadedImg = await img.cloudinary.upload(img);
            img = uploadedImg.secure_url;
        }

        const newPost = Post ({
            postedBy,
            img,
            text,
        })

    await newPost.save();
        resizeBy.status(201).json({message: "Post created successfully", newPost});
        console.log('Post created successfully')
    }catch (error) {
        res.status(500).json({error: 'Inernal server error'});
        console.error('Internal service error:', error);
    }
};