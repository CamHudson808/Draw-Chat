import React from 'react'

type CanvasButtonsProps = {
    setColor: (color: string) => void; // Function that takes a string and returns void
    setSize: (size: number) => void;  // Function that takes a number and returns void
};

export default function CanvasButtons({setColor, setSize} : CanvasButtonsProps) {

    const sizeHandler = () => {
        

    }

    const colorHandler = () => {


    }

    
    return (
        <div className="CanvasControls">
        
        <button className="ClearButton">
            Clear

        </button>

        <button className="ColorButton">
            Color
            
        </button>

        <button className ="IncreaseSize">
            +
        </button>

        <button className="DecreaseSize">
            -
        </button>


        </div>

    );

}