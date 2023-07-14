const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const conversationsRouter = require("./routes/conversations");
const messagesRouter = require("./routes/messages");


const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.MONGO_URL, function(){
    console.log("mongodb database connected successfully....");
});

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },filename: (req,file,cb)=>{
        cb(null, req.body.name);
    }
});

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"),(req,res)=>{
    res.status(200).json("file has been uploaded successfully.....");
});

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/conversations", conversationsRouter);
app.use("/api/messages", messagesRouter);

app.get("/",async function(req,res){
    res.json("server started successfully...");
});


//listen port 
const port = 8080;

app.listen(port , function(){
    console.log("server started at port 8080..")
})