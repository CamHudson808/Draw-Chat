import React, { useEffect } from 'react';
import CanvasRoom from '../Components/CanvasRoom';
import { Socket } from 'socket.io-client';
import { Link, useNavigate } from 'react-router-dom';

type ChatRoomsProps = {
    roomsData: {roomName: string, roomDesc: string}[] | null;
    socket?: React.RefObject<Socket | null>;
    setRoomName: React.Dispatch<React.SetStateAction<string>>;
}

export default function ChatRooms( {roomsData, socket, setRoomName}: ChatRoomsProps) {

    const navigate = useNavigate();

    function handleConnect(index: number) {
        // Get this working later...
         if(!socket?.current) {
            return;
        }
        const roomName = roomsData![index]['roomName'];

        socket?.current.emit('join room', roomName);
        setRoomName(roomName);
        navigate('/drawRoom');
        return;
    }

     useEffect(() => { 
    let original_bg_color = document.body.style.backgroundColor;
    document.body.style.backgroundColor = 'rgba(238, 238, 238, 1)';
    return () => { document.body.style.backgroundColor = original_bg_color };
    }, [])


    return (
        <div className="flex justify-center">
            <div className ="flex flex-col items-center w-[1150px] p-2">
            <h1 className="font-montserrat font-bold text-white text-7xl"> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-500">Join</span> Rooms</h1>
            <Link to="/createRoom">
            <button className="absolute top-7 right-10 text-2xl text-white bg-green-500 p-2 rounded shadow ml-auto
                               hover:bg-green-600 transition duration-300 ease-in-out">Create Room</button>
            </Link>

            <ul className="flex flex-col gap-5 p-4 items-center">
                {roomsData?.map((data, index) => {
                    return <li key={data['roomName']}>
                        <div className="flex justify-center items-center gap-4">
                            <CanvasRoom name={data['roomName']} description={data['roomDesc']}/>     
                            <button className="text-white text-2xl h-[50px] p-2 bg-green-500 rounded shadow
                                               hover:bg-green-600 transition duration-300 ease-in-out" onClick={() => handleConnect(index)}>Join</button>
                        </div>
                    </li>
                })}
            </ul>
            </div>
        </div>
    );
}