import React, { useRef, useEffect, useState } from "react";
import { Socket } from 'socket.io-client';
import "../App.css"
import CanvasButtons from "./CanvasButtons";
export default function CanvasBox({socket, roomName}: {socket: React.RefObject<Socket | null>, roomName: string}) {

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

    // FOR HANDLING RECEIVING SERVER DRAWING
    useEffect(() => {
        if (!socket?.current) {
            return;
        }

        const handleStart = ({ x, y, color, size }: any) => {
            if (!contextRef.current) {
                return;
            }
            contextRef.current.strokeStyle = color;
            contextRef.current.lineWidth = size;
            contextRef.current.beginPath();
            contextRef.current.moveTo(x, y);
        };

        const handleDraw = ({ x, y }: any) => {
            if (!contextRef.current) {
                return;
            }
            contextRef.current.lineTo(x, y);
            contextRef.current.stroke();
        };

        const handleEnd = () => {
            contextRef.current?.closePath();
        };

        socket.current.on("draw:start", handleStart);
        socket.current.on("draw:move", handleDraw);
        socket.current.on("draw:end", handleEnd);

    }, [socket]);


    // FOR HANDLING LOCAL DRAWING AND EMITTING
    const startDraw = (e: any) => {
        if(canvasRef.current) {
            const x = e.clientX-canvasRef.current.offsetLeft;
            const y = e.clientY-canvasRef.current.offsetTop;
            contextRef.current?.beginPath();
            contextRef.current?.moveTo(x,y);
            setIsPressed(true);

            socket.current?.emit("draw:start", { roomName, x, y, color, size });
        
        }
    };

    const updateDraw = (e: any) => {
        if(!isPressed || !contextRef.current) {
            return;
        }

        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;

        contextRef.current.lineTo(x, y);
        contextRef.current.stroke();

        socket.current?.emit("draw:move", { roomName, x, y });

    };

    const endDraw = (e: any) => {
        if(!isPressed) {
            return;
        }
        contextRef.current?.closePath();
        setIsPressed(false);
        socket.current?.emit("draw:end", { roomName });
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