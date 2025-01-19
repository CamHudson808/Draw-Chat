import { useRef, useEffect, useState } from "react";
import React from 'react'
import "../App.css"
import CanvasButtons from "./CanvasButtons";
export default function CanvasBox() {

    const [color, setColor] = useState("#000000"); //Default color is black
    const [size, setSize] = useState(5);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isPressed, setIsPressed] = useState<boolean>(false)

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {

            canvas.width = 800
            canvas.height = 800

            const ctx = canvas.getContext("2d");

            if (ctx) {
                ctx.lineCap = "round";
                ctx.strokeStyle = color; 
                ctx.lineWidth = size;
                contextRef.current = ctx;
            }
        }
    }, [color, size]);

    const startDraw = (e: any) => {
        if(canvasRef.current) {
        //console.log(e);
        contextRef.current?.beginPath();
        contextRef.current?.moveTo(e.clientX-canvasRef.current.offsetLeft, 
                                   e.clientY-canvasRef.current.offsetTop);

        console.log(`x: ${e.clientX-canvasRef.current.offsetLeft}, y: ${e.clientY-canvasRef.current.offsetTop}`);

        setIsPressed(true);
        }
    };

    const endDraw = (e: any) => {
        contextRef.current?.closePath();
        setIsPressed(false);

    };

    const updateDraw = (e: any) => {
        if(!isPressed) return;

        contextRef.current?.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        contextRef.current?.stroke();

    };

    return (
        <div className="CanvasContainer">
        <canvas 
        className="canvas"
        ref={canvasRef}
        onMouseDown={(e) => startDraw(e)}
        onMouseMove={(e) => updateDraw(e)}
        onMouseUp={(e) => endDraw(e)}
        >
        </canvas>
    
        <CanvasButtons setColor={setColor} setSize={setSize}/>
        
        </div>

    );

}