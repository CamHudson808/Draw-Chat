import React from 'react'
export default function CanvasRoom({name, description}: {name: string, description: string}) {

    return (
        <div className="bg-white w-[650px] h-[100px] overflow-y-auto rounded shadow p-2 flex flex-col">
            {/* <div className="w-[200px] bg-black"></div> */}
            <div className="bg-stone-100 text-center">{name}</div>
            <div>{description}</div>
        </div>
    );
}