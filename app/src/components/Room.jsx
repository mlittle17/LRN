import React, { useRef, useEffect, useState } from 'react';
// import io from 'socket.io-client';
import Peer from 'simple-peer';

import Slider from 'react-slick';
import styled from 'styled-components';
import { Grid, Typography, Avatar } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Board from './Board.jsx';
// import Video from './Video.jsx';
import Questions from './Questions.jsx';
import socket from './Socket.jsx';

import '../styles/Upcoming.css';

// const Container = styled.div`
//     padding: 20px;
//     display: flex;
//     height: 100vh;
//     width: 90%;
//     margin: auto;
//     flex-wrap: wrap;
// `;

const StyledVideo = styled.video`
position: static;
border: 1px solid #cddfe7;
bottom: 60px;
right: 40px;
box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
border-radius: 5px;
width: 300px;
`;

const settings = {
  arrows: true,
  className: 'slides',
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 2,
};

const Video = (props) => {
  const ref = useRef();
  const { key } = props;

  useEffect(() => {
    props.peer.on('stream', stream => {
      ref.current.srcObject = stream;
    });
  }, []);

  return (
    <>
      <Typography variant="h4" component="h6" style={{ float: 'left', color: '#2d2e2e' }}>{key}</Typography>

      <StyledVideo playsInline autoPlay ref={ref} />
    </>
  );
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const Room = (props) => {
  const [peers, setPeers] = useState([]);
  // const socket = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const { roomID } = props.match.params;
  const [videoSwitch, setVideoSwitch] = useState(true);
  const [audioSwitch, setAudioSwitch] = useState(true);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
      userVideo.current.srcObject = stream;
      socket.current.emit('join room', roomID);
      socket.current.on('all users', users => {
        const peers = [];
        users.forEach(userID => {
          const peer = createPeer(userID, socket.current.id, stream);
          peersRef.current.push({
            peerID: userID,
            peer,
          });
          peers.push(peer);
        });
        setPeers(peers);
      });

      socket.current.on('user joined', payload => {
        const peer = addPeer(payload.signal, payload.callerID, stream);
        peersRef.current.push({
          peerID: payload.callerID,
          peer,
        });

        setPeers(users => [...users, peer]);
      });

      socket.current.on('receiving returned signal', payload => {
        const item = peersRef.current.find(p => p.peerID === payload.id);
        item.peer.signal(payload.signal);
      });
    });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', signal => {
      socket.current.emit('sending signal', { userToSignal, callerID, signal });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', signal => {
      socket.current.emit('returning signal', { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  function pauseVideo() {
    if (userVideo.current.srcObject) {
      console.log('pause video button', !videoSwitch, userVideo.current.srcObject.getVideoTracks());
      userVideo.current.srcObject.getVideoTracks()[0].enabled = !videoSwitch;
      setVideoSwitch(!videoSwitch);
    }
  }

  function mute() {
    if (userVideo.current.srcObject) {
      // userVideo.current.srcObject.getAudioTracks()[0].enabled = !audioSwitch;
      setAudioSwitch(!audioSwitch);
    }
  }

  return (
    <Container>
      <div className="ui stackable two column grid">
        <div className="column">
          <Board />
          <Questions user={props.user} />
        </div>

        <div className="column">
          <Grid container justify="space-around" style={{ marginBottom: 15 }}>
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            <div className="justify-center mt-2 z-40">
              {/* video on/off button */}
              <button type="button" onClick={pauseVideo} className="ui icon button">
                <i aria-hidden="true" className="play icon" />
              </button>
              {/* audio on/off button */}
              <button type="button" onClick={mute} className="ui icon button">
                <i aria-hidden="true" className="microphone icon" />
              </button>
            </div>
            {peers.length === 1 && (
              peers.map((peer, index) => {
                return (
                  <div>
                    <Video key={index} peer={peer} style={{ height: 150, width: 300 }} />
                  </div>
                );
              })
            )}
            {peers.length > 1 && (
              <Slider {...settings} style={{ width: '300px', height: '200px', backgroundColor: '#' }}>
                {peers.map((peer, index) => {
                  const { userID } = peer;
                  return (
                    <div>
                      {/* <Typography variant="h4" component="h6" style={{ float: 'left', color: '#2d2e2e' }}>{index + 1}</Typography> */}
                      <Video key={userID} peer={peer} />
                    </div>
                  );
                })}
              </Slider>
            )}
          </Grid>
        </div>
      </div>

    </Container>
  );
};
export default Room;
