import React, { useContext, useState } from "react";
import "./share.scss";
import photoIcon from "../../images/logo/photoalbum.png"
import tagIcon from "../../images/logo/tag.png"
import locationIcon from "../../images/logo/location.png"
import { Context } from "../../context/Context";
import axios from "axios";

function Share (){
    const PF = "http://localhost:8080/images/";
    const { user } = useContext(Context);
    const [desc,setDesc] = useState("");
    const [file,setFile] = useState(null);

    const handelSubmit = async (e)=>{
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc:desc,
        }
        if(file){
            const data = new FormData();
            const filename = Date.now() +file.name;
            data.append("name",filename);
            data.append("file",file);
            newPost.img = filename;
            try {
                await axios.post("http://localhost:8080/api/upload", data);
            } catch (err) {
                console.log(err);
            }
        }
        try {
            const res = await axios.post("http://localhost:8080/api/posts", newPost);
            console.log(res.data);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="share">
            <form onSubmit={handelSubmit} className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src={PF + user.profilePic} alt="Load..." />
                    <input 
                        type="text" 
                        required="true" 
                        placeholder="What is going on your mind" 
                        className="shareInput" 
                        onChange={(e)=>setDesc(e.target.value)}    
                    />
                </div>
                <hr className="shareHr"/>
                {file && <img className="postPhoto"
                    src={URL.createObjectURL(file)} 
                    alt="" 
                />}
                <div className="shareBottom">
                    <div className="shareOptions">
                        <label htmlFor="photoInput" className="shareOption">
                            <img className="shareOptionImg" src={photoIcon} alt="Load.." />
                            <span className="shareOptionName">Photo</span>
                            <input id="photoInput"
                                type="file"
                                style={{display:"none"}}
                                onChange={(e)=>setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <img className="shareOptionImg" src={tagIcon} alt="Load.." />
                            <span className="shareOptionName">Tag</span>
                        </div>
                        <div className="shareOption">
                            <img className="shareOptionImg" src={locationIcon} alt="Load.." />
                            <span className="shareOptionName">Locatioin</span>
                        </div>
                        <button type="submit" className="shareButton">Share</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Share;