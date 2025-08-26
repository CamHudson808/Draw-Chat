import React, {useEffect, useState} from 'react';
import supabase from '../supabase_config/supabaseClient'
import { Session } from '@supabase/supabase-js';
import Button from '@mui/material/Button';
import Login from '../Components/Login';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

    // This is how we are doing supabase google authentication
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })
    return () => subscription.unsubscribe()
  }, []);
  
  const SignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }

  const SignOut = async () => {
      const { error } = await supabase.auth.signOut();
      if(error) {
        console.log(error);
      }
  }
  
  const handleNavigate = () => {
    navigate('/joinRooms');
  }

  //When in production
  return (
    <div>
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-[100vw] h-[75px]">
        </div>

        <div className="bg-white flex items-center h-[75px] justify-between px-4">
            <h1 className="text-blue text-2xl">DRAW CHAT</h1>
            <div className="flex gap-4">
              {!session && <button className='googleButton' onClick = {SignIn}> Sign In </button>}
              {session && <Button disabled={!session} variant="contained" color="success" size="large" onClick={handleNavigate}>Collaborate</Button>}
              {session && <button className='googleButton' onClick = {SignOut}> Sign Out </button>}
            </div>
        </div> 

        <div className="bg-gray-100 h-[100vh]">
          {/* Here maybe we put a picture of the app in action */}

        </div>
        {/* {session && <h1>Welcome Back, {session?.user.email}</h1>} */}
    </div>
  );
}
