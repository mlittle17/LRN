import React, { useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { Container } from 'semantic-ui-react';

import CanvasDraw, {getSaveData} from "react-canvas-draw";

const BoardTwo = () => {
  const socketRef = useRef();

const onDrawingEvent = (data) => {
    console.log('hello');
  }


  return (
    <Container>
      <CanvasDraw onChange={() => onDrawingEvent()} />
    </Container>
  );
};
export default BoardTwo;