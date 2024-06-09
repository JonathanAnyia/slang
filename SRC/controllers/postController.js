import User from "../models/user.model.js";
import Post from "../models/postmodels.js";
import express from "express";
import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv";
dotenv.config();


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:  process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRETE
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

export const getAllPost = async (req,res,next)=>{
    try{
        const allPosts = await Post.find()
        if (!allPosts){
            res.status(404).json({Message: " No posts found"})
        } else if(allPosts){
            res.status(200).json({Message:"Found Post", Post: allPosts})

        }
    }catch(e){
        console.log(e)

    }

}

export const getSinglePost = async (req,res,next) => {
    try{
        const postId = req.params.id;

        const singlePost = await Post.findById(postId)
        if (!singlePost){
            res.status(404).json({Message: "Post not found"})

        } else if(singlePost) {
            res.status(200).json({Message:"Post Found", singlePost})

        }
    } catch(e) {
        console.log(e)

    }

}

export const deletePost = async (req, res, next)=>{
    try{
        // Find the post based on the users id which is gotten from the jwt
        const post = await Post.findById(req.params.id)
        if (!post){
            return res.status(404).json({Message: " Not found"})
        }
        // This checks whether the id of the user that posted it is the same as the id gotten from the jwt to ensure that
        // the same user that is trying to delete is the same one that's logged in
        if(post.postedBy.toString() !== req.user.id.toString()){
            return res.status(401).json({Message: " Not your post"})
        }
        await Post.findByIdAndDelete(post)
        res.status(200).json({Message:"Post Deleted!"})
    } catch (e) {
console.log(e)
    }
}

export const deleteAllPostsForASingleUser = async (req,res,next) => {
    try{
        // Find the post based on the users id which is gotten from the jwt
        const post = await Post.findById(req.params.id);
        if (!post){
            return res.status(404).json({Message: " Not found"})
        }
        // This checks whether the id of the user that posted it is the same as the id gotten from the jwt to ensure that
        // the same user that is trying to delete is the same one that's logged in
        if(post.postedBy.toString() !== req.user._id.toString()){
            return res.status(401).json({Message: " Not your post"})
        }
        // This will delete every single post that user has
        await Post.deleteMany(post)
        res.status(200).json({Message:"Posts Deleted!"})
    } catch (e) {
        console.log(e)
    }

}

export const likePost = async (req, res, next) =>{

    const post = await Post.findByIdAndUpdate(req.params.id,{
        $push:{likes:req.user.id} },{new:true})
    if (!post){
        res.status(404).json({Message:"Post not found"})
        throw new Error
    }
    res.status(201).json({Message:"Liked Post", Likes:post.likes})

}

export const unlikePost = async (req,res,next) =>{
    const post = await Post.findByIdAndUpdate(req.params.id,{
        $pull:{likes:req.user.id} },{new:true})
    if (!post){
        res.status(404).json({Message:"Post not found"})
        throw new Error
    }
    res.status(201).json({Message:"Post Unliked", Likes:post.likes})

}