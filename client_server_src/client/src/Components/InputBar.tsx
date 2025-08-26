import React from 'react';
import { useState, useRef, useEffect } from 'react'
import { Socket } from 'socket.io-client';

export default function InputBar({socket, setCharLeft, username}: {socket: React.RefObject<Socket | null>, 
    setCharLeft: React.Dispatch<React.SetStateAction<number>>, username: string}) {

    const [messageInput, setMessageInput] = useState<string>("");
    //Message input causes a re render, which in this instances restarts socket.io(), so i should pass it in a a prop
    // const socket = io(); //On default will try to connect to the url that served it?
    const input_ref = useRef(null);
    const charLimit: number = 50;

    useEffect(() => {
        setCharLeft(charLimit - messageInput.length)
    }, [messageInput, setCharLeft]); 
    
    const handleChange = (event : any) => {
        setMessageInput(event.target.value);
    };

    const sendMessage = (event : any) => { 
        //if socket is not connected for some reason, do nothing
        if(!socket?.current) {
            return;
        }
        //Want to also check that the element is being focused on
        if (event.key === 'Enter' && input_ref.current === document.activeElement
            && messageInput.length > 0
        ) {
            let message = {username: username, message: messageInput};
            console.log(message);
            //Now, we need to find a way to send this to the server
            // console.log(`${message}`);
            // console.log(`user [${socket?.current.id}] trying to send a message`);
            socket?.current.emit('chat message', message);
            // console.log("message got emited??");
            setMessageInput("");
        }
    };

    return (
            <input className='inputBox' 
            type="text" value={messageInput} 
            ref = {input_ref}
            onChange = {handleChange} 
            onKeyDown = {sendMessage} 
            maxLength = {charLimit}
            placeholder='Type Your Message Here' />
    );
}