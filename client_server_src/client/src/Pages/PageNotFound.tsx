import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function PageNotFound() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/');
    }

    return (
        <div className="p-2 flex flex-col gap-4 items-center">
            
            <h1 className="text-white text-8xl"> 
                404 
            </h1>

            <h1 className="text-white text-8xl m-4">
                Oops.. page not found.
            </h1>

            <Button variant="contained" color="error" size="large" onClick={() => handleNavigate()}>Go Back</Button>
        </div>
    );
}