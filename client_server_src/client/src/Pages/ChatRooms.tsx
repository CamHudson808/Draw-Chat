import React from 'react';
import CanvasRoom from '../Components/CanvasRoom';
import { Link } from 'react-router-dom';

export default function ChatRooms( {roomsData}: {roomsData: any[] | null} ) {

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
                {roomsData?.map((data) => {
                    return <li>
                    <div className="flex justify-center gap-4">
                    <CanvasRoom name={data['roomName']} description={data['roomDesc']}/>     
                    <button className="text-white text-2xl p-2 bg-green-500 rounded shaodw">Join</button>
                    </div>
                    </li>
                })}
            </ul>
            {/* Have a button for each room, meaning we are going to need something to store the rooms... time for POSTGRESS HAHAHAHA! */}
        </div>
    );
}