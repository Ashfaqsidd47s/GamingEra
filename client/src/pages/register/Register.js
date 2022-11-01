import React, { useState } from "react";
import "./register.scss";
import Add from "../../images/logo/add.png";
import axios from "axios";

function Register(){
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [err,setErr] = useState(false);

    const handelSubmit = async (e)=>{
        e.preventDefault();
        setErr(false);
        try {
            const res = await axios.post("http://localhost:8080/api/auth/register",{username:username, password:password, email:email});
            console.log(res);
        } catch (err) {
            setErr(true);
            console.log(err);
        }
    }

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Near Chat</span>
                <span className="title">Register</span>
                <form onSubmit={handelSubmit}>
                    <input 
                        type="text" 
                        placeholder="display name" 
                        required="true" 
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="email" 
                        required="true" 
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="password" 
                        required="true" 
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <input style={{display:"none"}} type="file" id="file"/>
                    <label htmlFor="file">
                        <img src={Add} alt="" />
                        <span>Add an avatar</span>
                    </label>
                    <button type="submit">Sign up</button>
                </form>
                <p>you do have an account? Login</p>
                {err &&<p className="err">someting went wrong!!..</p>}
            </div>
        </div>
    );
}

export default Register;