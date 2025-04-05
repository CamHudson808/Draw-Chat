import React, { useState } from "react";
import "../App.css"
import hideIcon from "../icons/hide.svg"
import showIcon from "../icons/show.svg"
import supabase from "../config/supabaseClient"

export default function Login({setUser, setIsLoggedIn} : {setUser:any, setIsLoggedIn:any}) {

    //Here we are going to add the icon thingy to hide/show password
    const [passwordType, setPasswordType] = useState("password");
    const [icon, setIcon] = useState(hideIcon);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function attemptLogin() {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });
    
            if (error) {
                console.error("Login failed:", error.message);
                return;
            }
    
            setUser(data.user);
            setIsLoggedIn(true);

        } catch (error) {
            console.error("Unexpected error:", error);
        }
    }

    function SignInPage() {
        //Route the user to a different page?
    }

    const onToggle = () => {
        if(icon === hideIcon) {
            setIcon(showIcon);
            setPasswordType("text");
        }
        else if(icon === showIcon) {
            setIcon(hideIcon);
            setPasswordType("password");
        }
    }

    return (
        <div>
            <div className="LoginPassword">
            <input
            className="userpass"
            type="text"
            placeholder="e.g. John@email.com"
            onChange={(e) => setEmail(e.target.value)}
            />
            <div className="PasswordBar">
            <input
            className="userpass"
            id="passwordbar"
            type={passwordType}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            />
            <img src={icon} onClick={onToggle} className="passwordicon" alt="Hide Password"/>
            </div>
            <div className="SignInButton">
                <button onClick={() => attemptLogin()}>
                    Login
                </button>
            </div>
            </div>
        </div>
    );
}