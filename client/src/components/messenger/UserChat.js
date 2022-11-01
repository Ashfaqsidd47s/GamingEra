import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

function UserChat({conversation, currentUser, onlineUsers}) {
    const PF = "http://localhost:8080/images/";
    const [friend,setFriend] = useState(null);
    const [isOnline, setIsOnline] = useState(false);

    useEffect(()=>{
        const friendId = conversation.members.find((m)=> m !== currentUser._id);
        
        const getUser =async ()=>{
            try {
                const res = await axios.get("http://localhost:8080/api/users/" + friendId);
                setFriend(res.data);
                if(friend){setIsOnline(onlineUsers.some((o) => o.userId === friend._id));
                }
            } catch (err) {
                console.log(err);
            }
        }
        getUser();
    },[currentUser,onlineUsers])

    
  return (
    <div className="userChat">
        { friend ?
            <><img src={PF + friend.profilePic} alt="not found" />
                {isOnline && <span className="checkOnline"></span>}
                <div className="userChatInfo">
                    <span>{friend.username}</span>
                    <p>hello bro</p>
                </div>
            </> :<></>
        }
    </div>
  )
}

export default UserChat
