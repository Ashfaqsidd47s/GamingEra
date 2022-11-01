import React, { useContext } from "react";
import "./profile.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { Context } from "../../context/Context";

function Profile() {
    const PF = "http://localhost:8080/images/";
    const { user } = useContext(Context);
  

    return(
        <div className="profile">
        <Navbar />
        <div className="profileWrapper">
            <Sidebar />
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img className="profileCoverImg"
                            src={ PF + user.coverPic} 
                            alt=""  
                        />
                        <img className="profileUserImg" 
                            src={ PF + user.profilePic} 
                            alt="" 
                        />
                    </div>
                    <div className="profileInfo">
                        <h4 className="profielInfoName">{user.username} </h4>
                        <span className="profileInfoDesc">Hello friends...</span>
                        <button>Edit profile</button>
                    </div>
                </div>
                <div className="profileRightBottom">
                    <Feed />
                    <Rightbar />
                </div>
            </div>
        </div>
     </div>
    );
}

export default Profile;