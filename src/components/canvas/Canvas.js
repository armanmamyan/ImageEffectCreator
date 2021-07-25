import { useRef } from "react";

function Canvas({}){
    const canvasRef = useRef();

    return(
        <canvas ref={canvasRef} />
    )
}

export default Canvas