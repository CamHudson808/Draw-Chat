import React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import supabase from '../supabase_config/supabaseClient';
import { useNavigate } from 'react-router-dom';
import '../App.css'

export default function CreateProfile({hasUser, getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}}: {hasUser: boolean, getUser?: () => Promise<any>}) {

    const [selectedImg, setSelectedImg] = useState(null);
    const [blobUrl, setBlobUrl] = useState<string>("");
    const [email, setEmail] = useState<string | undefined>("something@gmail.com");
    const [username, setUsername] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const navigate = useNavigate();

    // async function getUser() {
    //     const { data: { user } } = await supabase.auth.getUser();
    //     return user;
    // }

    useEffect(()=> {
        if(hasUser) {
            navigate('/editProfile');
        }
    }, [hasUser, navigate]);
  
    useEffect(() => {
        getUser().then((user) => {

            setEmail(user!.email);
            setUserId(user!.id);

        });

    }, [getUser]);

    useEffect(() => {
        if(selectedImg) {
            setBlobUrl(URL.createObjectURL(selectedImg));
        }

    }, [selectedImg]);
    
    
    async function handleCreate() {

        if(!username || !blobUrl || !userId) {
            console.log("you are missing something");
            return;
        }            

        const { data, error } = await supabase
        .from('Users')
        .insert([{userId, username, blobUrl}])
        .select();

        if(error) {
            console.log("there was an error");
            console.log(error);
        }

        if(data) {
            //redirect the user to join a room
            // console.log(data);
            navigate('/joinRooms');
        }
       //Table should be id, display_name, avatar_url
       //Add the username to a table profiles that is linked to the google user table

    }

    function handleChange(e: any) {
        setUsername(e.target.value);
    }

    function handleQuit() {
        navigate('/');
    }

    function handleFileChange(event: any) {
        setSelectedImg(event.target.files[0])
    }

    useEffect(() => { 
    let original_bg_color = document.body.style.backgroundColor;
    document.body.style.backgroundColor = 'rgba(238, 238, 238, 1)';
    return () => { document.body.style.backgroundColor = original_bg_color };
}, [])

    return (
        <div>
            <div className="bg-white h-[500px] w-[600px] rounded mt-[100px] p-5">
                <div className="flex flex-col">
                
                <input className="fileUpload" type="file" accept="image/*" onChange={handleFileChange}/>
                {blobUrl ? <img className="profileBlob" alt="img" src={blobUrl} width="100" height="100"></img> : 
                    <div className="placeholderImg"></div>}
                </div>
                <div className="flex flex-col items-center gap-4">
                    <TextField id="standard-basic" label="Name" variant="standard" onChange={handleChange} />
                    <TextField disabled id="user-email" label="Email" variant="standard" value={email}/>
                    {/* <TextField id="standard-basic" label="Password" variant="standard" /> */}
                    <div className="flex gap-2">
                    <Button variant="contained" color="success" onClick={handleCreate}>Create</Button>
                    <Button variant="contained" color="error" onClick={handleQuit}>Quit</Button>
                    </div>
                </div>
            </div>
        </div>
    );

}