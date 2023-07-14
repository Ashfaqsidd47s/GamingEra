import React, { useContext } from "react";
import "./sidebar.scss";
import { Link, NavLink } from "react-router-dom";
import { Context } from "../../context/Context";

function Sidebar(){
    const PF = "http://localhost:8080/images/";
    const {user,dispatch} = useContext(Context);

    const handelLogout = ()=>{
        dispatch({type: "LOGOUT"});
    }

    return(
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarProfile">
                    <img src={PF + user.profilePic} alt="" />
                    <span className="profileName">{user.username}</span>
                </div>
                <div className="sidebarMenue">
                    <NavLink to="/"  className="link">
                        <div className="menueItem">
                            <div className="menueItemIcon">
                                <i class="fa-solid fa-house"></i>
                            </div>
                            <div className="menueItemName">
                                <h3>Home</h3>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to="/messenger" className="link">
                        <div className="menueItem">
                            <div className="menueItemIcon">
                                <i class="fa-solid fa-comment"></i>
                            </div>
                            <div className="menueItemName">
                                <h3>messenger</h3>
                            </div>
                        </div>
                    </NavLink>
                    <div className="menueItem">
                        <div className="menueItemIcon">
                            <i class="fa-solid fa-bell"></i>
                        </div>
                        <div className="menueItemName">
                            <h3>Notification</h3>
                        </div>
                    </div>
                    <div className="menueItem notImp">
                        <div className="menueItemIcon">
                            <i class="fa-solid fa-bookmark"></i>
                        </div>
                        <div className="menueItemName">
                            <h3>Library</h3>
                        </div>
                    </div>
                    <div className="menueItem notImp">
                        <div className="menueItemIcon">
                            <i class="fa-solid fa-trophy"></i>
                        </div>
                        <div className="menueItemName">
                            <h3>Turnament</h3>
                        </div>
                    </div>
                    <NavLink to="/profile" className="link">
                        <div className="menueItem">
                            <div className="menueItemIcon">
                                <i class="fa-solid fa-user"></i>
                            </div>
                            <div className="menueItemName">
                                <h3>Profile</h3>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to="/edit" className="link">
                    <div className="menueItem">
                        <div className="menueItemIcon">
                            <i class="fa-solid fa-gear"></i>
                        </div>
                        <div className="menueItemName">
                            <h3>Setting</h3>
                        </div>
                    </div>
                    </NavLink>
                </div>
                <button 
                    className="sidebarBtn logoutBtn" 
                    onClick={(handelLogout)}
                >LogOut</button>
                <button className="sidebarBtn">Share Post</button>
            </div>
        </div>
    );
}

export default Sidebar;