import React, { useContext, useEffect } from "react";
import "./post.scss";
import { useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";

function Post({post}) { 
    const PF = "http://localhost:8080/images/"; 
    const {user} = useContext(Context);  
    const [postUser,setPostUser] = useState({});
    const [like,setLike] = useState(99);
    const [Islike,setIsLike] = useState(false);

    const likeHandler =()=>{
        if(Islike){
             setLike(like-1);
        }else {
            setLike(like+1);
        }

        setIsLike(!Islike);
    };

    useEffect(()=>{
        const fetUser = async ()=>{
            try {
                const res = await axios.get("http://localhost:8080/api/users/" + post.userId );
                setPostUser(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetUser()
    },[]);

    const handelDelete = async (e)=>{
        e.preventDefault();
        console.log("postid:",post._id)
        console.log("userid:",user._id)
        try {
            const res = await axios.delete("http://localhost:8080/api/posts/" + post._id , {data:{userId:user._id}});
            console.log("res.data:",res.data);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img 
                            src={PF + postUser.profilePic} 
                            alt="" 
                            className="postTopImg"     
                        />
                    </div>
                    <div className="postTopCenter">
                        <h3 className="postTopName">{postUser.username}</h3>
                        <p className="postTopTags">dehradun</p>
                    </div>
                    <div className="postTopRight">
                        <i class="deleteIcon fa-solid fa-trash-can" onClick={handelDelete}></i>
                        <i className="shareIcon fa-solid fa-share"></i>
                    </div>
                </div>
                <div className="postCenter">
                    <p className="postCenterText">{post.desc}</p>
                    <img src={PF + post.img} alt="Load..." className="postCenterImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomTop">
                        <div className="postBottomTopLeft">
                            {Islike ? <i class="likeFill fa-solid fa-heart" onClick={likeHandler}></i> : <i class="like fa-regular fa-heart" onClick={likeHandler}></i>}
                            <i class="fa-regular fa-comment"></i>
                            <i class="fa-solid fa-share"></i>
                        </div>
                        <div className="postBottomTopRight">
                            <i class="fa-regular fa-bookmark"></i>
                        </div>
                    </div>
                    <div className="postBottomCenter">
                        <p className="likeCount">{like} likes</p>
                        <p className="commmentCount"> comments</p>
                        <p className="postDate">september 6</p>
                    </div>
                    <hr className="postBottomEndHr" />
                    <div className="postBottomEnd">
                        <div className="postBottomEndIcon">
                            <i class="fa-regular fa-comment"></i>
                        </div>
                        <div className="postBottomEndInput">
                            <input placeholder="Add a comment..." />
                        </div>
                        <div className="postBottomEndLink">
                            <h4>Post</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;