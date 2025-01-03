import React from "react"
import { useState } from "react";
import "../App.css"
import hideIcon from "../icons/hide.svg"
import showIcon from "../icons/show.svg"

export default function Login() {

    //Here we are going to add the icon thingy to hide/show password
    const [passwordType, setPasswordType] = useState("password");
    const [icon, setIcon] = useState(hideIcon);

    const onToggle = () => {
        if(icon === hideIcon) {
            setIcon(showIcon);
        }
        else if(icon === showIcon) {
            setIcon(hideIcon);
        }
    }

    return (
        <div>
            <div className="LoginPassword">
            <input
            className="userpass"
            type="text"
            placeholder="e.g. John"
            />
            <div className="PasswordBar">
            <input
            className="userpass"
            id="passwordbar"
            type={passwordType}
            placeholder="Password"
            />
            </div>
            <span>
                <img src={icon} alt="Hide Password"/>
                </span>
            </div>
            
        </div>
    );

}