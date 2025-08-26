import React from 'react';
import CanvasRoom from '../Components/CanvasRoom';
import { Socket } from 'socket.io-client';
import { Link, useNavigate } from 'react-router-dom';

export default function ChatRooms( {roomsData, socket, setRoomName}: {roomsData: any[] | null, socket: React.RefObject<Socket | null>, 
                                                                      setRoomName: React.Dispatch<React.SetStateAction<string>>} ) {

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

    //Figured it out, probably going to have to use dynamic routing to get the rooms working
    return (
        <div>
            <div className ="flex items-center justify-between w-[1150px] ml-[720px] p-2">
            <h1 className="text-white text-7xl">Join Rooms</h1>
            <Link to="/createRoom">
            <button className="text-2xl text-white bg-green-500 p-2 rounded shadow ml-auto">Create Room</button>
            </Link>
            </div>

            <ul className="flex flex-col gap-5 p-4 items-center">
                {roomsData?.map((data, index) => {
                    return <li>
                        <div className="flex justify-center gap-4">
                            <CanvasRoom name={data['roomName']} description={data['roomDesc']}/>     
                            <button className="text-white text-2xl p-2 bg-green-500 rounded shadow" onClick={() => handleConnect(index)}>Join</button>
                        </div>
                    </li>
                })}
            </ul>
            {/* Have a button for each room, meaning we are going to need something to store the rooms... time for POSTGRESS HAHAHAHA! */}
        </div>
    );
}