import React, {useEffect, useState} from 'react';
import supabase from '../supabase_config/supabaseClient';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

export default function EditProfile() {

    const [email, setEmail] = useState<string | undefined>("something@gmail.com");
    const [username, setUsername] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [prevUsername, setPrevUsername] = useState<string>("");
    const [disabled, setDisabled] = useState<boolean>(false);

    async function getUser() {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    }

     useEffect(() => {
        getUser().then((user) => {

            setEmail(user!.email);
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
            if(data) {
                setUsername(data.username);
                setPrevUsername(data.username);
            }
        }
        getUsername(userId)

        });

    }, [email, userId, username]);

    const handleChange = (e:any) => {
        setUsername(e.target.value);
        if (username === prevUsername) {
            setDisabled(true);
        }
        else {
            setDisabled(false);
        }
    }

    const handleUpdate = async () => {
        const { error } = await supabase  
        .from('Users')  
        .update({ name: username })  
        .eq('id', userId)
        
        if(!error) {
            
        }
    }

    return (
        <div> 
            <div className="bg-white h-[500px] w-[600px] rounded mt-[100px] p-5">
                {/* <div className="flex flex-col">
                
                <input className="fileUpload" type="file" accept="image/*" onChange={handleFileChange}/>
                {blobUrl ? <img className="profileBlob" alt="img" src={blobUrl} width="100" height="100"></img> : 
                    <div className="placeholderImg"></div>}
                </div> */}
                <div className="flex flex-col items-center gap-4">
                    <TextField id="standard-basic" label="Name" variant="standard" onChange={handleChange} />
                    <TextField disabled id="user-email" label="Email" variant="standard" value={email}/>
                    {/* <TextField id="standard-basic" label="Password" variant="standard" /> */}
                    <div className="flex gap-2">
                    <Button disabled={!disabled} variant="contained" color="success" onClick={handleUpdate}>Create</Button>
                    {/* <Button variant="contained" color="success" onClick={handleCreate}>Create</Button> */}
                    {/* <Button variant="contained" color="error" onClick={handleQuit}>Quit</Button> */}
                    </div>
                </div>
            </div>
        </div>

    );
}