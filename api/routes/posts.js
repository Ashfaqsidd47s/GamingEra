const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE POST 
router.post("/",async function(req,res){
    const newPost = new Post(req.body);
    try {
        const savePost =await newPost.save();
        res.status(200).json(savePost);
    } catch (err) {
        res.status(500).json(err)
    }
});

//UPDATE POSTS 
router.put("/:id",async function(req,res){
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId == req.body.userId){
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id , {
                    $set:req.body
                },
                {new: true});
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
                console.log(err);
            }
        } else{
            res.status(401).json("you can update only your posts.....")
        }
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//DELETE POSTS 
router.delete("/:id",async function(req,res){
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            try {
                await post.delete();
                res.status(200).json("post has been successfully deleted...");
            } catch (err) {
                res.status(500).json(err);
                console.log(err);
            }
        } else{
            res.status(401).json("you can delete only your posts.....")
        }
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//GET A SINGLE POST 
router.get("/:id",async function(req,res){
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});


//GET ALL POST OF A SINGLE USER
router.get("/user/:id",async function(req,res){
    try {
        const posts = await Post.find({userId:req.params.id});
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
})



module.exports = router;