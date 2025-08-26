import React, { useState, useEffect } from 'react' 
import { Socket } from 'socket.io-client';
import InputBar from './InputBar';
import MessageBox from './MessageBox';
import supabase from '../supabase_config/supabaseClient';
import "../App.css"

interface Message {
    username: string;
    message: string;
}

export default function TextBox({ socket, messages }: {socket: React.RefObject<Socket | null>, messages: Message[]}) {
    //Now we need to figure out how to get the chat stuff working...
    const [charLeft, setCharLeft] = useState<number>(50);
    const [userId, setUserId] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    async function getUser() {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    }

     useEffect(() => {
        getUser().then((user) => {

            setUserId(user!.id);

            async function getUsername(userId: string) {
            const { data, error } = await supabase  
            .from('Users')  
            .select('username')
            .eq("userId", userId)
            .maybeSingle()

            if(error) {
                console.log(error);
            }
            if (data) {
              setUsername(data.username);
            }
        }
        getUsername(userId)

        });

    }, [userId]);
    
    //Get username so messages send with username

     return (
       <div className="chatbox">
        {/* Can either implement with message box or something else, but need to use list elements */}
        <MessageBox messages = {messages}/>
        <div className = "inputContainer">
        <InputBar socket = {socket} setCharLeft = {setCharLeft} username={username}/>
        <div className = "charLeft">{charLeft}</div>
        </div>
       </div>
    );
}