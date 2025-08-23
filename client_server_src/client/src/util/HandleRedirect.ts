// import React from 'react';
// import { useNavigate } from 'react-router-dom';
import supabase from '../supabase_config/supabaseClient';

//Checks if the user is loggin in AND has created a user for themselves

// -1 return means return to login
// -2 return means return to join room

export default async function HandleRedirect() {

    // const navigate = useNavigate();

    async function getUserId() {
        const { data: { user } } = await supabase.auth.getUser();
        return user!.id;
    }

    async function getSession() {
        const { data: { session } } = await supabase.auth.getSession();
        return session;
    }
    
    async function checkRedirect() {
        const session = await getSession();
        if(!session) {
            return -1;
        }

        // console.log(session);

        const userId = await getUserId();
        const { data, error } = await supabase
        .from('Users')
        .select()
        .eq('userId', userId);

        console.log(userId);

        if(error) {
            console.log(error);
        }
        
        if(!data) {
            return -2;
        }
        
    }
    return checkRedirect();
}