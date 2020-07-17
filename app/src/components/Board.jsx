/* eslint-disable radix */
import React, { useRef, useEffect } from 'react';
import io from 'socket.io-client';

import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import '../styles/Board.css';

const Board = () => {
  const canvasRef = useRef(null);
  const colorsRef = useRef(null);
  const socketRef = useRef();

  useEffect(() => {
    // --------------- getContext() method returns a drawing context on the canvas-----

    const canvas = canvasRef.current;
    const test = colorsRef.current;
    const context = canvas.getContext('2d');

    // ---------------------------------------------------------------------------------

    // ----------------------- Colors --------------------------------------------------
    const colors = document.getElementsByClassName('color');
    console.log(colors, 'the colors');
    console.log(test);
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
    let drawing = false;
    // ---------------------------------------------------------------------------------

    // ------------------------------- create the drawline ----------------------------
    const drawLine = (x0, y0, x1, y1, color, emit) => {
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      context.lineWidth = 2;
      context.stroke();
      context.closePath();

      if (!emit) { return; }
      const w = canvas.width;
      const h = canvas.height;

      socketRef.current.emit('drawing', {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color,
      });
    };
    // ----------------------------------------------------------------------------------
    // get the current canvas offsets using getBoundingClientRect
    const BB = canvas.getBoundingClientRect();
    const offsetX = BB.left;
    const offsetY = BB.top;

    // ---------------- mouse movement --------------------------------------
    const onMouseDown = (e) => {
      drawing = true;

      current.x = parseInt(e.clientX - offsetX) || parseInt(e.touches[0].clientX - offsetX);
      current.y = parseInt(e.clientY - offsetY) || parseInt(e.touches[0].clientY - offsetY);
    };

    const onMouseMove = (e) => {
      if (!drawing) { return; }
      drawLine(current.x, current.y, parseInt(e.clientX - offsetX) || parseInt(e.touches[0].clientX - offsetX), parseInt(e.clientY - offsetY) || parseInt(e.touches[0].clientY - offsetY), current.color, true);
      current.x = parseInt(e.clientX - offsetX) || parseInt(e.touches[0].clientX - offsetX);
      current.y = parseInt(e.clientY - offsetY) || parseInt(e.touches[0].clientY - offsetY);
    };

    const onMouseUp = (e) => {
      if (!drawing) { return; }
      drawing = false;
      // drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, true);
    };

    // ------------------------------------------------------------------------

    // ----------- limit the number of events per second -----------------------

    const throttle = (callback, delay) => {
      let previousCall = new Date().getTime();
      return function () {
        const time = new Date().getTime();

        if ((time - previousCall) >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    };

    // -------------------------------------------------------------------------

    // ----------------------- Clear all canvases ----------------------------

    const clearCanvas = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const emitAndCanvas = () => {
      socketRef.current.emit('clear');
      clearCanvas();
    };
    const clearButton = document.getElementsByClassName('clear');

    clearButton[0].addEventListener('click', emitAndCanvas, false);
    // -------------------------------------------------------------------------

    // -----------------add event listeners to our canvas ----------------------

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mouseout', onMouseUp, false);
    canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

    // Touch support for mobile devices
    canvas.addEventListener('touchstart', onMouseDown, false);
    canvas.addEventListener('touchend', onMouseUp, false);
    canvas.addEventListener('touchcancel', onMouseUp, false);
    canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);
    // --------------------------------------------------------------------------

    // -------------- make the canvas fill its parent component -----------------
    const onResize = () => {
      canvas.width = window.innerWidth * 0.50;
      canvas.height = window.innerHeight * 0.50;
    };

    window.addEventListener('resize', onResize, false);
    onResize();
    // -------------------------------------------------------------------------

    // ----------------------- socket.io connection ----------------------------
    const onDrawingEvent = (data) => {
      const w = canvas.width;
      const h = canvas.height;
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    };

    socketRef.current = io.connect('/');
    socketRef.current.on('drawing', onDrawingEvent);
    socketRef.current.on('clear', clearCanvas);
  }, []);
  // ----------------------------------------------------------------------------

  // ------------- The Canvas and color elements --------------------------

  return (
    <div>
      <div ref={colorsRef} className="colors">
        <div className="color black" />
        <div className="color red" />
        <div className="color green" />
        <div className="color blue" />
        <div className="color yellow" />
        <IconButton aria-label="delete" className="clear">
          <DeleteIcon fontSize="medium" />
        </IconButton>
      </div>
      <div className="boardContainer">
        <canvas ref={canvasRef} className="whiteboard" />
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------
export default Board;
