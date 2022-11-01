const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validate } = require("../models/Post");

//REGISTER USER
router.post("/register",async function(req,res){
    try {
        const salt =await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })

        const user = await newUser.save();
        const {password, ...others} = user._doc;
        res.status(200).json(others); 
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//LOGIN USER
router.post("/login",async function(req,res){
    try {
        const user =await User.findOne({email: req.body.email});
        !user && res.status(400).json("the emai you entered is not valid...");

        const validate =await bcrypt.compare(req.body.password , user.password);
        !validate && res.status(400).json("you have enterd wrong password ...");

        const {password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
})

module.exports = router;