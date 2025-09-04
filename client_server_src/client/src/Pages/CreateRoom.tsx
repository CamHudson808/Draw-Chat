import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import supabase from '../supabase_config/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function CreateRoom() {

const [roomName, setRoomName] = useState<string>("");
const [roomDesc, setRoomDesc] = useState<string>("");
const navigate = useNavigate();

async function handleCreate() {

        if(!roomName || !roomDesc) {
            console.log("you are missing something");
            return;
        }            

        const { data, error } = await supabase
        .from('Chat_Rooms')
        .insert([{roomName, roomDesc}])
        .select();

        if(error) {
            console.log("there was an error");
            console.log(error);
        }

        if(data) {
            //redirect the user to join a room
            console.log(data);
            navigate('/joinRooms');
        }
    }
function handleChangeName(e: any) {
        setRoomName(e.target.value);
    }

function handleChangeDesc(e: any) {
        setRoomDesc(e.target.value);
    }

useEffect(() => { document.body.style.backgroundColor = 'rgba(238, 238, 238, 1)' }, [])

return (
    <div className="flex flex-col items-center">
        <div className ="flex items-center">
            <h1 className="font-montserrat font-bold text-white text-7xl"> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-500">Create</span> Room</h1>
            <Link to="/joinRooms">
            <button className="absolute top-7 right-10 ri text-2xl text-white 
                               bg-green-500 p-2 px-4 rounded shadow ml-auto
                               hover:bg-green-600 transition duration-300 ease-in-out">Exit</button>
            </Link>
        </div>

        <div className="flex flex-col items-center bg-white h-[500px] w-[600px] rounded mt-[100px] p-5 flex flex-col gap-10">
            <TextField sx={{ width: '500px'}} id="standard-basic" label="Room Name" variant="standard" onChange={handleChangeName} />
            <TextField sx={{ width: '500px'}} label="Room Description" variant="standard" onChange={handleChangeDesc}/>
            <Button sx={{ width: '120px' }} variant="contained" color="success" onClick={handleCreate}>Create</Button>
        </div>
    </div>
);

}