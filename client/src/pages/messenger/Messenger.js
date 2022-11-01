import React from "react";
import "./messenger.scss";  
import UserChat from "../../components/messenger/UserChat";
import Message from "../../components/messenger/Message";
import { useContext,useState,useEffect } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { useRef } from "react";
import {io} from "socket.io-client";

function Messenger() {
    const PF = "http://localhost:8080/images/";
    const {user} = useContext(Context);
    const [conversations,  setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messsages, setMessages] = useState([]);
    const [newMessage,setNewMessage] = useState("");
    const [arrivalMessage,setArrivalMessage] = useState(null);
    const [onlineUsers,setOnlineUsers] = useState([]);
    const socket = useRef();
    const scrollRef = useRef();

    useEffect(()=>{
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) =>{
            setArrivalMessage({
                sender:data.senderId,
                text:data.text,
                createdAt:Date.now(),
            });
        });
    },[]);

    useEffect(()=>{
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && 
            setMessages(prev=>[...prev, arrivalMessage]);
    },[arrivalMessage])

    useEffect(()=>{
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers",users=>{
            setOnlineUsers(users);
        });
    },[user])

    //useEffect for gettting all the conversatins form dat base 
    useEffect(()=>{
        const getConversation = async ()=>{
            try {
                const res = await axios.get("http://localhost:8080/api/conversations/" + user._id);
                setConversations(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getConversation();
    },[user]);

    //useEffect for getting all the messages from mongodb data base
    useEffect(()=>{
        const getMessages = async ()=>{
            try {            
                const res = await axios.get("http://localhost:8080/api/messages/" + currentChat._id);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getMessages();
    },[currentChat]);

    //function for sending message or hndell submit function 
    const handelsubmit = async (e)=>{
        e.preventDefault();
        const message ={
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const reciverId = currentChat.members.find(
            (member) => member !== user._id
        );

        socket.current.emit("sendMessage", {
            senderId: user._id,
            reciverId,
            text: newMessage,
        })

        try {
            const res = await axios.post("http://localhost:8080/api/messages", message);
            setMessages([...messsages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    }


    //useEffect for end scroll chat 
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    },[messsages])

//function return part 
    return (
        <div className="messenger">
            <div className="container">
                {/* sidebar of messenger which includes the all the conversations  */}
                <div className="sidebar">
                    <div className="navbar">
                        <span className="logo">Near Chat</span>
                        <div className="user">
                            <img src={PF + user.profilePic} alt="" />
                            <span>{user.username}</span>
                            <button>Logout</button>
                        </div>
                    </div>
                    <div className="search">
                        <div className="searchForm">
                            <input type="text" placeholder="find a user "/>
                        </div>
                        <div className="userChat">
                            <img src="https://images.unsplash.com/photo-1659605199215-83f8b3a8b5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80" alt="" />
                            <div className="userChatInfo">
                                <span>display name</span>
                            </div>
                        </div>
                    </div>
                    <div className="chats">
                        {conversations.map((c)=>(
                            <div onClick={()=> setCurrentChat(c)} >
                                <UserChat 
                                    conversation={c} 
                                    currentUser={user}
                                    onlineUsers={onlineUsers}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {/* second part of messenger which includes all the messages of the conversation  */}
                {currentChat ? 
                    <div className="chat">
                        <div className="chatInfo">
                            <span>prtu</span>
                            <div className="chatIcons">
                                <i class="fa-solid fa-video"></i>
                                <i class="fa-solid fa-bell"></i>
                                <i class="fa-regular fa-heart"></i>
                            </div>
                        </div>
                        <div className="messages">
                            {messsages.map((m)=>(
                                <div ref={scrollRef}>
                                    <Message 
                                        key={m._id}
                                        message={m} 
                                        owner={m.sender === user._id}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="input">
                            <input 
                                type="text" 
                                placeholder="Type something...."
                                onChange={(e) =>setNewMessage(e.target.value)}
                                value={newMessage}
                            />
                            <div className="send">
                                <i class="fa-solid fa-paperclip"></i>
                                <input type="file" style={{display:"none"}} id="file" />
                                <label htmlFor="file">
                                    <i class="fa-solid fa-camera"></i>
                                </label>
                                <button onClick={handelsubmit}>Send</button>
                            </div>
                        </div>
                    </div> : 
                    <div className="nochat">
                        select a user to start conversation with him
                    </div>
                }
            </div>
        </div>
    );
}

export default Messenger;