import React from 'react'
import { useState } from 'react' 
import InputBar from './InputBar';
import MessageBox from './MessageBox';
import "../App.css"
import { Socket } from 'socket.io-client';

export default function TextBox({ socket, messages }: {socket: React.RefObject<Socket | null>, messages: string[]}) {
    //Now we need to figure out how to get the chat stuff working...
    const [charLeft, setCharLeft] = useState<number>(50);

     return (
       <div className="chatbox">
        {/* Can either implement with message box or something else, but need to use list elements */}
        <MessageBox messages = {messages}/>
        <div className = "inputContainer">
        <InputBar socket = {socket} setCharLeft = {setCharLeft}/>
        <div className = "charLeft">{charLeft}</div>
        </div>
       </div>
    );
}