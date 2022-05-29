import React, { useRef, useEffect } from 'react';

function App() {
  const canvas = useRef();
  let ctx = null;

  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;

    // get context of the canvas
    ctx = canvasEle.getContext('2d');
  }, []);

  useEffect(() => {
    drawLine({ x: 0, y: 600, x1: 226, y1: 331 }, { color: 'white' });
    drawLine({ x: 226, y: 331, x1: 333, y1: 454 }, { color: 'white' });
    drawLine({ x: 333, y: 454, x1: 592, y1: 454 }, { color: 'white' });
    drawLine({ x: 592, y: 454, x1: 739, y1: 257 }, { color: 'white' });
    drawLine({ x: 739, y: 257, x1: 848, y1: 333 }, { color: 'white' });
    drawLine({ x: 848, y: 333, x1: 998, y1: 136 }, { color: 'white' });
    drawLine({ x: 998, y: 136, x1: 1164, y1: 136 }, { color: 'white' });
    drawLine({ x: 1164, y: 136, x1: 1450, y1: 368 }, { color: 'white' });
  }, []);

  // draw a line
  const drawLine = (info, style = {}) => {
    const { x, y, x1, y1 } = info;
    const { color = 'black' } = style;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  return (
    <div className="App">
      <h3>Space Lander</h3>
      <canvas ref={canvas}></canvas>
    </div>
  );
}

export default App;
