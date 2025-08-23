import React from 'react'
export default function CanvasRoom({name, description}: {name: string, description: string}) {

    return (
        <div className="bg-white w-[650px] h-[100px] overflow-scroll rounded shadow p-2 flex">
            {/* <div className="w-[200px] bg-black"></div> */}
            <div>A room name: {name}, description: {description}</div>
        </div>
    );
}