import React, { useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { Container } from 'semantic-ui-react';

import '../styles/board.css';

const Board = () => {
  const canvasRef = useRef(null);
  const colorsRef = useRef(null);
  const socketRef = useRef();





















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
