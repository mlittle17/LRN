import React, { useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { Container } from 'semantic-ui-react';

import '../styles/board.css';

const Board = () => {
  const canvasRef = useRef(null);
  const colorsRef = useRef(null);
  const socketRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // ----------------------- Colors
    const colors = document.getElementsByClassName('color');
    console.log(colors, 'the colors');

    // set the current color
    const current = {
      color: 'black',
    };

    // helper that will update the current color
    const onColorUpdate = (e) => {
      current.color = e.target.className.split(' ')[1];
    };

    // loop through the color elements and add the click event listeners
    for (let i = 0; i < colors.length; i++) {
      colors[i].addEventListener('click', onColorUpdate, false);
    }

    // ------------------------------
    let drawing = false;

















  });

  // The Canvas and color elements
  return (
    <Container>
      <canvas ref={canvasRef} className="whiteboard" />

      <div ref={colorsRef} className="colors">
        <div className="color black" />
        <div className="color red" />
        <div className="color green" />
        <div className="color blue" />
        <div className="color yellow" />
      </div>
    </Container>
  );
};
export default Board;
