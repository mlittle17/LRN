import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import Slider from 'react-slick';

import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import Board from './Board.jsx';

import '../styles/Upcoming.css';

const Container = styled.div`
    padding: 20px;
    // display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 20%;
    width: 30%;
`;

const settings = {
  arrows: true,
  className: 'slides',
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on('stream', stream => {
      ref.current.srcObject = stream;
    });
  }, []);

  return (
    <StyledVideo playsInline autoPlay ref={ref} style={{ height: 200, width: 350 }} />
  );
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const Room = (props) => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const { roomID } = props.match.params;

  useEffect(() => {
    socketRef.current = io.connect('/');
    navigator.mediaDevices.getUserMedia({ video: videoConstraints }).then(stream => {
      userVideo.current.srcObject = stream;
      socketRef.current.emit('join room', roomID);
      socketRef.current.on('all users', users => {
        const peers = [];
        users.forEach(userID => {
          const peer = createPeer(userID, socketRef.current.id, stream);
          peersRef.current.push({
            peerID: userID,
            peer,
          });
          peers.push(peer);
        });
        setPeers(peers);
      });

      socketRef.current.on('user joined', payload => {
        const peer = addPeer(payload.signal, payload.callerID, stream);
        peersRef.current.push({
          peerID: payload.callerID,
          peer,
        });

        setPeers(users => [...users, peer]);
      });

      socketRef.current.on('receiving returned signal', payload => {
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
      socketRef.current.emit('sending signal', { userToSignal, callerID, signal });
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
      socketRef.current.emit('returning signal', { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <Container>
      <Grid container justify="space-around" style={{ marginBottom: 15 }}>
        <StyledVideo muted ref={userVideo} autoPlay playsInline />
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
              return (
                <div>
                  <p>{index}</p>
                  <Video key={index} peer={peer} />
                </div>
              );
            })}
          </Slider>
        )}
      </Grid>
      <Board />

    </Container>
  );
};

export default Room;
