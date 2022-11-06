import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.scss";


function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [err,setErr] = useState(false);
    const { user, dispatch } = useContext(Context);

    const handelSubmit = async (e)=>{
        e.preventDefault();
        dispatch({type: "LOGIN_START"});
        setErr(false);
        try {
            const res = await axios.post("http://localhost:8080/api/auth/login",{email: email, password: password});
            console.log(res);
            dispatch({type: "LOGIN_SUCCESS",payload: res.data});
        } catch (err) {
            setErr(true);
            dispatch({type: "LOGIN_FAILURE"});
            console.log(err);
        }
    }
    
    console.log("user in global context:",user);
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Gaming Era</span>
                <span className="title">Login</span>
                <form onSubmit={handelSubmit}>
                    <input 
                        type="email" 
                        placeholder="email"
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="password" 
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <button type="submit">Sign in</button>
                </form>
                <p>
                    you don't have an account? 
                    <Link to="/register" className="link">
                        <span>Register</span>
                    </Link>
                </p>
                {err &&<p className="err">someting went wrong!!..</p>}
            </div>
        </div>
    );
}

export default Login;