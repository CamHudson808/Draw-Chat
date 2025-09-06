import React, {useEffect, useState} from 'react';
import supabase from '../supabase_config/supabaseClient'
import { Session } from '@supabase/supabase-js';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { TypewriterClass } from 'typewriter-effect';
import '../App.css';

export default function Home({supabaseClient = supabase}: {supabaseClient?: any}) {

  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

    // This is how we are doing supabase google authentication
  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }: any) => {
      setSession(session);
    })

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event: any, session: any) => {
      setSession(session);
    })
    return () => subscription.unsubscribe()
  }, );
  
  const SignIn = async () => {
    await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
    });
  }

  const SignOut = async () => {
      const { error } = await supabaseClient.auth.signOut();
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
            <h1 className="font-montserrat font-bold text-blue text-2xl">DRAW CHAT</h1>
            <div className="flex gap-4">
              {!session && <button className='googleButton' onClick = {SignIn}> Sign In </button>}
              {session && <Button disabled={!session} variant="contained" color="success" size="large" onClick={handleNavigate}>Collaborate</Button>}
              {session && <button className='googleButton' onClick = {SignOut}> Sign Out </button>}
            </div>
        </div> 

        <div className="flex items-center justify-center bg-gray-100 h-[100vh]">
        {/* <TypewriterComponent options={{
          strings: ["Start drawing and chatting today!", 
                    "What's something cool you could draw today?",
                    "Remember to have fun!"],
          autoStart: true,
          loop: true,
        }}/> */}
        
          {/* <h1 className="font-montserrat text-center font-bold text-8xl w-[600px] h-[600px]">Start Drawing and Chatting Today!</h1> */}
        </div>
        {/* {session && <h1>Welcome Back, {session?.user.email}</h1>} */}
    </div>
  );
}
