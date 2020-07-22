import React, { useRef, useEffect, useState } from 'react';
import Peer from 'simple-peer';

// the video style

import Slider from 'react-slick';
import { Grid, Typography, Avatar } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { StyledVideo } from '../styles/StyledComponents.jsx';
import Board from './Board.jsx';
// import Video from './Video.jsx';
import Questions from './Questions.jsx';
import socket from './Socket.jsx';

import '../styles/Upcoming.css';

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

const InstructorSession = (props) => {
  const [peers, setPeers] = useState([]);
  // const socket = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const { roomID } = props.match.params;
  const [videoSwitch, setVideoSwitch] = useState(true);
  const [audioSwitch, setAudioSwitch] = useState(true);
  const joinLink = window.location.href.split('instructor').join('student');

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: videoConstraints }).then(stream => {
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

  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', signal => {
      socket.current.emit('sending signal', { userToSignal, callerID, signal });
    });

    return peer;
  };

  const addPeer = (incomingSignal, callerID, stream) => {
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
  };

  const pauseVideo = () => {
    if (userVideo.current.srcObject) {
      console.log('pause video button', !videoSwitch, userVideo.current.srcObject.getVideoTracks());
      userVideo.current.srcObject.getVideoTracks()[0].enabled = !videoSwitch;
      setVideoSwitch(!videoSwitch);
    }
  };

  const mute = () => {
    if (userVideo.current.srcObject) {
      // userVideo.current.srcObject.getAudioTracks()[0].enabled = !audioSwitch;
      setAudioSwitch(!audioSwitch);
    }
  };

  return (
    <Container>
      <div className="ui stackable three column grid">
        <div className="column">
          <h1> Event Name </h1>
          <a href={joinLink}>Here is the student join link</a>
          <a>(open in new tab for testing)</a>

          <StyledVideo muted ref={userVideo} autoPlay playsInline />
          <button type="button" onClick={pauseVideo} className="ui icon button">
            <i aria-hidden="true" className="play icon" />
          </button>
          {/* audio on/off button */}
          <button type="button" onClick={mute} className="ui icon button">
            <i aria-hidden="true" className="microphone icon" />
          </button>

        </div>
        <div className="column">
          <Board />
        </div>
        <div className="column">
          students
          {peers.length >= 1 && (
            peers.map((peer, index) => {
              return (
                <div>
                  <Video key={index} peer={peer} style={{ height: 150, width: 300 }} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </Container>
  );
};

export default InstructorSession;
