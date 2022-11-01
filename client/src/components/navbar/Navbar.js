import React, { useContext } from "react";
import "./navbar.scss";
import { Context } from "../../context/Context";

function Navbar() {
    const {user} = useContext(Context);
    const PF = "http://localhost:8080/images/";

    return(
        <div className="navbar">
            <div className="navbarWrapper">
                <div className="logo">
                    <h1>GAMING ERA</h1>
                </div>
                <div className="searchBlock">
                    <div className="searchIcon">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <input type="text" className="searchInput" placeholder="find something....."/>
                </div>
                <div className="rightBlock">
                    <div className="navbarIcons">
                        <div className="navbarIcon">
                            
                        </div>
                    </div>
                    <div className="profileIcon">
                        <img src={PF + user.profilePic} alt="Load.." />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;