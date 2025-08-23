import React from "react";
import "../App.css";

/*
How this should work:
message gets sent to the server, server sends it back to all connected clients
First, we need to figure out how server stuff works
We know that node is the way we do server stuff, so lets hop to the backend code
*/

export default function MessageBox({messages}: {messages: string[]}) {
    //This should be a flexbox that contains messages 
    return (
    <div className = "messageBox">
        <ul className = "messageUl">
            {messages.map((msg, index) => {
                return <li className={
                index % 2 !== 0 ? "messageLi li-odd" : "messageLi li-even"
                }>{msg}</li>
            })}
        </ul>
    </div>
    );
    
}
