import { useState } from "react";
import { useRef, useEffect } from "react";

const MyCanvas = ({ x, y, width, height, image, onClick }) => {
  const [canvasRef, setCanvasRef] = useState(useRef(null));

  const drawImage = () => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");
    if (width > height) {
      canvas.width = (width / height) * 100;
      canvas.height = 100;
      ctx.drawImage(image, x, y, width, height, 0, 0, canvas.width, canvas.height);
    } else {
      canvas.width = 100;
      canvas.height = (height / width) * 100;
      ctx.drawImage(image, x, y, width, height, 0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    drawImage();
  }, []);

  return <canvas ref={canvasRef} className="flex mx-1 cursor-pointer" onClick={() => onClick(canvasRef.current)} />;
};

export default MyCanvas;
