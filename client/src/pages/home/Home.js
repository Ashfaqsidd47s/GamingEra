import React from "react";
import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import { Outlet } from "react-router-dom";

function Home (){

    return(
        <div className="home">
           <Navbar />
           <div className="homeContainer">
                <Sidebar />
                <Feed />
                <Rightbar />
           </div>
           <Outlet />
        </div>
    );
}

export default Home;