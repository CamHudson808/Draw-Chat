import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import supabase from '../supabase_config/supabaseClient';
import { useNavigate } from 'react-router-dom';
import HandleRedirect from '../util/HandleRedirect';

export default function CreateRoom() {

HandleRedirect();

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

return (
    <div className="flex flex-col items-center">
        <div className ="flex items-center justify-between w-[1150px] ml-[720px] p-2">
            <h1 className="text-white text-7xl">Create A Room</h1>
            <Link to="/joinRooms">
            <button className="text-2xl text-white bg-green-500 p-2 rounded shadow ml-auto">Exit</button>
            </Link>
        </div>

        <div className="bg-white h-[500px] w-[600px] rounded mt-[100px] p-5 flex flex-col">
            <TextField id="standard-basic" label="Room Name" variant="standard" onChange={handleChangeName} />
            <TextField label="Room Description" variant="standard" onChange={handleChangeDesc}/>
            <Button variant="contained" color="success" onClick={handleCreate}>Create</Button>
        </div>
    </div>
);

}