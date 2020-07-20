import React, {
  useState, ReactElement, useRef, useEffect,
} from 'react';
import { Container } from 'semantic-ui-react'
import styled from 'styled-components';


const Video = ({ peer, userID}) => {
  const ref = useRef();

  const StyledVideo = styled.video`
  position: static;
  border: 1px solid #cddfe7;
  bottom: 60px;
  right: 40px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 300px;
`;

  useEffect(() => {
    peer.on('stream', stream => {
      ref.current.srcObject = stream;
    });
  }, []);

  return (
    <Container>
      <StyledVideo ref={ref} key={userID} playsInline autoPlay>
        <track></track>
      </StyledVideo>
    </Container>
  );
};

export default Video;

// const Video = (props) => {
//   const ref = useRef();
//   const { key } = props;

//   useEffect(() => {
//     props.peer.on('stream', stream => {
//       ref.current.srcObject = stream;
//     });
//   }, []);

//   return (
//     <>
//       <Typography variant="h4" component="h6" style={{ float: 'left', color: '#2d2e2e' }}>{key}</Typography>
//       <StyledVideo playsInline autoPlay ref={ref} style={{ height: 200, width: 350 }} />
//     </>
//   );
// };
