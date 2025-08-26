import React, { useEffect, useState, useRef } from 'react';
import { Socket } from 'socket.io-client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import supabase from './supabase_config/supabaseClient'
import io from "socket.io-client";

import CanvasChat from './Pages/CanvasChat';
import ChatRooms from './Pages/ChatRooms';
import Home from "./Pages/Home"
import CreateRoom from './Pages/CreateRoom';
import CreateProfile from './Pages/CreateProfile';
import EditProfile from './Pages/EditProfile';
import PageNotFound from './Pages/PageNotFound';

import PrivateRoutes from './Components/PrivateRoutes';

import './App.css';

// interface User {
//   username: string;
//   password: string;
// };

// interface Room {
//   roomName: string;
//   id: string;
//   desc: string;
//   img: string;  
// };

interface Message {
    username: string;
    message: string;
}


function App() {
  // const [session, setSession] = useState<Session | null>(null)
  const [hasUser, setHasUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomName, setRoomName] = useState<string>("");
  const [supabaseData, setSupabaseData] = useState<any[] | null>([]);

  // const supabase_url: string | undefined =  process.env.REACT_APP_SUPABASE_URL;
  // const supabase_api_key: string | undefined = process.env.R

  let socket = useRef<Socket>(null);
  const socketUrl = 'http://localhost:3000';

  //Gets info if logged in and has a user
  useEffect(() => {
    async function getUserSession() {
     const { data } = await supabase.auth.getSession();
     if(data) {
      setIsLoggedIn(true);
     }
    }
    async function getUserInfo() {
      const { data } = await supabase.auth.getUser();
      if(data) {
        setHasUser(true);
      }
    }
    getUserSession();
    getUserInfo();
  }, [])

  // console.log(hasUser);
  // console.log(isLoggedIn);

  //Connects socket
  useEffect(() => {
    // console.log("we called io() function to connect socket");
    socket.current = io(socketUrl);

    // Og code
    socket.current.on('message server', (data) => {
        console.log(data);
        // let newMessages = [...messages, data];
        setMessages((prevMessages) => [...prevMessages, data]);
    });

    // //Not sure if this code below works at all 
    // socket.current.on('intro message server', (data) => {
    //     // console.log(data);
    //     let newMessages = [...messages, data];
    //     setMessages(newMessages);
    // });


    // socket.current.on('exit message server', (data) => {
    //     // console.log(data);
    //     let newMessages = [...messages, data];
    //     setMessages(newMessages);
    // });
    // return () => {
    //       socket.current?.disconnect();
    // };


  }, [socketUrl, messages]);

   //Gets data from supabase
  useEffect(() => {
    async function fetchRooms() {
    const { data } = await supabase.from("Chat_Rooms").select();
    setSupabaseData(data);
  }
    fetchRooms();
  }, []);

   return (
    <HashRouter>
      <Routes>
        {/* <Route path="Login" element={<Login setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>}></Route> */}
        <Route path="/" element={<Home/>}/>
        {/* Private Routes */}
        <Route element={<PrivateRoutes isLoggedIn={isLoggedIn}/>}>
        <Route path="/createProfile" element={<CreateProfile hasUser={hasUser}/>}/>
        <Route path="/drawRoom" element={<CanvasChat socket = {socket} messages = {messages} roomName={roomName}/>}/>
        <Route path="/joinRooms" element={<ChatRooms roomsData = {supabaseData} socket = {socket} setRoomName={setRoomName}/>}/>
        <Route path="/createRoom" element={<CreateRoom/>}/>
        <Route path="/editProfile" element={<EditProfile/>}/>
        </Route>
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </HashRouter>
  );
}

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

export default App;

