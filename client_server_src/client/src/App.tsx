import React, { useEffect, useRef } from 'react';
import './App.css';
//import TextBox from "./Components/TextBox";
import CanvasBox from "./Components/CanvasBox";
import ChatBox from "./Components/ChatBox";
import Login from "./Components/Login"
import io from "socket.io-client";
import { useState } from "react"
import supabase from "./config/supabaseClient"
import { Session } from '@supabase/supabase-js';
import SignIn from './Components/SignIn';
import { GoogleLogin } from '@react-oauth/google';
import { Socket } from 'socket.io-client';

interface User {
  username: string;
  password: string;
}

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User[]>([]);
  const [loggedIn, setIsLoggedIn] = useState(false)
  const [messages, setMessages] = useState<string[]>([]);
  let socket = useRef<Socket>(null);
  const socketUrl = 'http://localhost:3000';

  //Connects socket
  useEffect(() => {
    // console.log("we called io() function to connect socket");
    socket.current = io(socketUrl);

    socket.current.on('message server', (data) => {
        console.log(data);
        let newMessages = [...messages, data];
        setMessages(newMessages);
        //Create a function that makes a message

    });

  }, [socketUrl, messages]) 

  //This is how we are doing supabase google authentication
  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   })

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   })
  //   return () => subscription.unsubscribe()
  // }, []);
  
  // const SignIn = async () => {
  //   await supabase.auth.signInWithOAuth({
  //     provider: 'google',
  //   });
  // }

  // const SignOut = async () => {
  //     const { error } = await supabase.auth.signOut();
  // }

  //Put the socket code here
  


  //When in production
//   return (
//     <div className="App">
//       <div className = "TitleSign">
//       {!session && <h1>DRAW CHAT</h1>}
//       {!session && <button className='googleButton' onClick = {SignIn}> Sign In </button>}
//       </div> 
//       {/* {session && <h1>Welcome Back, {session?.user.email}</h1>} */}
     
//       {session && <button className='signOut' onClick = {SignOut}> Sign Out </button>}
     
//       {session && <div className="CanvasChat">
//         <div className= "canvasbox">
//           <CanvasBox/>
//         </div>
//         <ChatBox/>
//       </div>}
//     </div>
//   );
// }
// During developement
return (
  <div className="App">
   
   {/* <button className='signOut' onClick = {SignOut}> Sign Out </button> */}
   
    <div className="CanvasChat">
      <div className= "canvasbox">
        <CanvasBox/>
      </div>
      <ChatBox socket = {socket} messages = {messages}/>
    </div>
  </div>
);
}

export default App;
