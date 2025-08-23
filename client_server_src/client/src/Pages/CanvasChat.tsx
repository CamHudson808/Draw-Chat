import React from 'react';
import CanvasBox from "../Components/CanvasBox";
import ChatBox from "../Components/ChatBox";
import { Socket } from 'socket.io-client';
import { Link } from 'react-router-dom';

export default function CanvasChat({ socket, messages }: {socket: React.RefObject<Socket | null>, messages: string[]}) {
return (
<div className="App">
   {/* <button className='signOut' onClick = {SignOut}> Sign Out </button> */}
    <div className="flex gap-4 mb-4">
      <Link to="/Login">
      <button className="text-white bg-green-500 p-2 rounded shadow">Home</button>
      </Link>

      <Link to="/joinRooms">
      <button className="text-white bg-green-500 p-2 rounded shadow">Rooms</button>
      </Link>
    </div>
   
    <div className="CanvasChat">
      <div className= "canvasbox">
        <CanvasBox/>
      </div>
      <ChatBox socket = {socket} messages = {messages}/>
    </div>
  </div>
);
}