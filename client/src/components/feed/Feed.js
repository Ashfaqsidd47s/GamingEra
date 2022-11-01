import React, { useContext, useEffect, useState } from "react";
import "./feed.scss";
import Post from "../post/Post";
import Share from "../share/Share";
import { Context } from "../../context/Context";
import axios from "axios";

function Feed() {
    const { user } = useContext(Context);
    const [posts,setPosts] = useState([]);

    useEffect(()=>{
        const fetchPosts = async ()=>{
            const res =await axios.get("http://localhost:8080/api/posts/user/" + user._id);
            setPosts(res.data);
        }
        fetchPosts();
    },[user])

    return(
        <div className="feed">
            <Share />
            {posts.map((p)=> (
                <Post post={p}/>
            ))}
        </div>
    );
}

export default Feed;