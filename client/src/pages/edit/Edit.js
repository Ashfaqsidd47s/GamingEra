import React, { useContext, useState } from "react";
import "./edit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Context } from "../../context/Context";
import axios from "axios";

function Edit(){
    const PF = "http://localhost:8080/images/";
    const { user, dispatch } = useContext(Context);
    const [file1,setFile1] = useState(null);
    const [file2,setFile2] = useState(null);
    const [username,setUsername] = useState(user.username);
    const [email,setEmail] = useState(user.email);
    const [password,setPassword] = useState("");

    const handelSubmit =async (e)=>{
        e.preventDefault();
        dispatch({type: "UPDATE_START"})
        const updatedUser = {
            userId: user._id,
            email: email,
            password: password,
            username: username,
        };
        if(file1){
            const data =new FormData();
            const filename = Date.now() +file1.name;
            data.append("name",filename);
            data.append("file",file1);
            updatedUser.profilePic = filename;
            try {
                await axios.post("http://localhost:8080/api/upload", data)
            } catch (err) {
                console.log(err);
            }
        }
        if(file2){
            const data =new FormData();
            const filename = Date.now() +file2.name;
            data.append("name",filename);
            data.append("file",file2);
            updatedUser.coverPic = filename;
            try {
                await axios.post("http://localhost:8080/api/upload", data)
            } catch (err) {
                console.log(err);
            }
        }
        try {
            const res =await axios.put("http://localhost:8080/api/users/" +user._id,updatedUser);
            dispatch({type: "UPDATE_SUCCESS",payload: res.data});
        } catch (err) {
            dispatch({type: "UPDATE_FAILURE"});
        }
    }

    return(
        <div className="edit">
        <Navbar />
        <div className="editWrapper">
            <Sidebar />
            <form className="editProfile" onSubmit={handelSubmit}>
                <div className="coverPic">
                    <label htmlFor="coverPicInput">
                        <img className="coverInputImg" 
                            src={file2 ? URL.createObjectURL(file2) : PF + user.coverPic } 
                            alt="loading" 
                        /> 
                    </label>
                    <input id="coverPicInput"
                        type="file" 
                        onChange={(e)=>setFile2(e.target.files[0])} 
                        style={{display: "none"}}   
                    />
                </div>
                <div className="ProfilePic">
                    <label htmlFor="profilePicInput">
                        <img className="profileInputImg" 
                            src={ file1 ? URL.createObjectURL(file1) : PF + user.profilePic}  
                            alt=""
                        /> 
                    </label>
                    <input id="profilePicInput"
                        type="file" 
                        onChange={(e)=>setFile1(e.target.files[0])}   
                        style={{display: "none"}} 
                    />
                </div>
                <div className="profileInputs">
                    <label htmlFor="userNameInput">
                        Name 
                    </label>
                    <input 
                        type="text" 
                        id="userNameInput" 
                        placeholder={username}
                        onChange={(e)=>setUsername(e.target.value)} 
                    />
                </div>
                <div className="profileInputs">
                    <label htmlFor="emailInput">
                        Email 
                    </label>                    
                    <input 
                        type="email" 
                        placeholder={email} 
                        id="emailInput"
                        onChange={(e)=>setEmail(e.target.value)} 
                    />
                </div>
                <div className="profileInputs">
                    <label htmlFor="passwordInput">
                        Password 
                    </label>                    
                    <input 
                        type="password" 
                        placeholder="password" 
                        id="passwordInput" 
                        onChange={(e)=>setPassword(e.target.value)}    
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
        </div>
    );
}

export default Edit;