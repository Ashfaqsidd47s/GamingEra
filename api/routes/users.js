const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post = require("../models/Post");

//UPDATE USER
router.put("/:id",async function(req,res){
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            },{new: true});
            const {password, ...others} = updateUser._doc;
            res.status(200).json(others);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    }
});

//DELETE USER 
router.delete("/:id",async function(req,res){
    if(req.body.userId === req.params.id){
        try {
            const user =await User.findById(req.params.id);
            
            try {
                await Post.deleteMany({userId:req.params.id});
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("Account has been deleted successfully..");
            } catch (err) {
                res.status(500).json(err);
                console.log(err);
            }
        } catch (err) {
            res.status(404).json("user not found");
            console.log(err);
        }
    }else {
        res.status(401).json("you can delete only your own account... ");
    }
});

//GET A USER 
router.get("/:id",async function(req,res){
    try {
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;