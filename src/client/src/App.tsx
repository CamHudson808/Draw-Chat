import React from 'react';
import './App.css';
//import TextBox from "./Components/TextBox";
import CanvasBox from "./Components/CanvasBox";
import ChatBox from "./Components/ChatBox";
import Login from "./Components/Login"
import io from "socket.io-client";
import { useState } from "react"

const socket = io("http://localhost:8000");

function App() {

  const [loggedIn, isLoggedIn] = useState(false)
  //const [room, setRoom] = useState("");
  //console.log(window.innerHeight, window.innerWidth);

  return (
    <div className="App">
    {!loggedIn && <h1>Welcome To Draw Chat!</h1>}
    {loggedIn && <h1>Draw Chat</h1>}

      {!loggedIn && <Login/>}

      {loggedIn && <div className="CanvasChat">
        <div className= "canvasbox">
          <CanvasBox/>
        </div>
        <ChatBox/>
      </div>}
    </div>
  );
}

export default App;
