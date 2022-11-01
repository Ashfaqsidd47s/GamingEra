import React from "react";
import {format} from "timeago.js";

function Message({message,owner}){
    
    return(
        <div className={owner ? "message owner" : "message"}>
            <div className="messageInfo">
                <img src="https://images.unsplash.com/photo-1659605199215-83f8b3a8b5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80" alt="" />
                <span>{format(message.createdAt)}</span>
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
            </div>
        </div>
    )
}

export default Message;