import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledVideo = styled.video`
position: static;
border: 1px solid #cddfe7;
bottom: 60px;
right: 40px;
box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
border-radius: 5px;
width: 300px;
`;

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const InstructorSession = (props) => {
  const userVideo = useRef();



  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
      userVideo.current.srcObject = stream;
  });
  }, []);


  return (
    <div>
      ttt
      <a>This is the instructors page</a>
      {props.vid}
      {/* <StyledVideo playsInline autoPlay ref={ref} /> */}
      <StyledVideo muted ref={userVideo} autoPlay playsInline />
    </div>
  );
};

export default InstructorSession;
