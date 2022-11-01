import React from "react";
import "./rightbar.scss";

function Rightbar (){

    return(
        <div className="rightbar">
            <div className="msgContainer">
                <div className="msgTop">
                    <h2>Message</h2>
                    <div className="msgSearch">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="text" className="msgSearchInput" placeholder="Search Message"/>
                    </div>
                    <ul className="msgCat">
                        <li>Primary</li>
                        <li>Genral</li>
                        <li>Request</li>
                    </ul>
                </div>
                <div className="msgBottom">
                    <div className="msgItem">
                        <img src="https://picsum.photos/200" alt="" />
                        <div className="msgItemRight">
                            <h3>User Name</h3>
                            <p>last message</p>
                        </div>
                    </div>
                </div>
            </div>
            <h3>Requests</h3>
            <div className="request">
                <div className="requestItem">
                    <div className="requestTop">
                        <img src="https://picsum.photos/200" alt="" />
                        <div className="requestTopRight">
                            <h3>User Name</h3>
                            <p>last message</p>
                        </div>
                    </div>
                    <div className="requestBottom">
                        <button className="accept">Accept</button>
                        <button className="remove">Remove</button>
                    </div>
                </div>
                <div className="requestItem">
                    <div className="requestTop">
                        <img src="https://picsum.photos/200" alt="" />
                        <div className="requestTopRight">
                            <h3>User Name</h3>
                            <p>last message</p>
                        </div>
                    </div>
                    <div className="requestBottom">
                        <button className="accept">Accept</button>
                        <button className="remove">Remove</button>
                    </div>
                </div>
                <div className="requestItem">
                    <div className="requestTop">
                        <img src="https://picsum.photos/200" alt="" />
                        <div className="requestTopRight">
                            <h3>User Name</h3>
                            <p>last message</p>
                        </div>
                    </div>
                    <div className="requestBottom">
                        <button className="accept">Accept</button>
                        <button className="remove">Remove</button>
                    </div>
                </div>
                <div className="requestItem">
                    <div className="requestTop">
                        <img src="https://picsum.photos/200" alt="" />
                        <div className="requestTopRight">
                            <h3>User Name</h3>
                            <p>last message</p>
                        </div>
                    </div>
                    <div className="requestBottom">
                        <button className="accept">Accept</button>
                        <button className="remove">Remove</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rightbar;