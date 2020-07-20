import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import Slider from 'react-slick';

import styled from 'styled-components';
import { Grid, Typography, Avatar } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Board from './Board.jsx';
import Video from './Video.jsx';

import '../styles/Upcoming.css';

const StyledVideo = styled.video`
position: static;
border: 1px solid #cddfe7;
bottom: 60px;
right: 40px;
box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
border-radius: 5px;
width: 300px;
`;

const StyledImage = styled.img`
position: static;
border: 1px solid #cddfe7;
bottom: 60px;
right: 40px;
box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
border-radius: 5px;
width: 300px;
height: 170px;
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
  const [videoSwitch, setVideoSwitch] = useState(true);
  const [audioSwitch, setAudioSwitch] = useState(true);
  const [videoStyle, setVideoStyle] = useState({height: 180});
  const [showAvatar, setShowAvatar] = useState(false);

  const [user, setUser] = useState({
    name: 'Not Logged In',
    avatar: 'https://ca.slack-edge.com/T02P3HQD6-URYEC04TS-1d8e4abade33-512',
    // avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTaUPxz9QpJvEvbLP1nX4jGz6yyiWthbrEn-g&usqp=CAU',
    email: 'sallyName@gmail.com',
    zip: 77777,
    subjects: ['Music', 'Math', 'History', 'Food'],
  });

  useEffect(() => {
    socketRef.current = io.connect('/');
    navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
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

  function pauseVideo() {
    if (userVideo.current.srcObject) {
      if (videoSwitch === false) {
      // conditionally make the video element height to zero so the image will take it's place
      setShowAvatar(true);
      setVideoStyle({height: 0});
      } else {
        setVideoStyle({height: 180});
        setShowAvatar(false);
      }
      setVideoSwitch(!videoSwitch);
      userVideo.current.srcObject.getVideoTracks()[0].enabled = videoSwitch;
    }
  }

  function mute() {
    if (userVideo.current.srcObject) {
      setAudioSwitch(!audioSwitch);
      userVideo.current.srcObject.getAudioTracks()[0].enabled = audioSwitch;
    }
  }

  return (
    <div className="ui stackable two column grid">
      <div className="column">
        <Board />
      </div>
      <div className="column">
        <Container maxWidth="sm">
          {/* your video */}
          {/* {videoSwitch === true ? <StyledVideo muted ref={userVideo} autoPlay playsInline />
            : <StyledImage src={props.user ? props.user.imageurl : user.avatar} />} */}
          <StyledVideo muted ref={userVideo} style={videoStyle} autoPlay playsInline />
          {(showAvatar === true) && <StyledImage src={props.user ? props.user.imageurl : user.avatar} />}
          <div className="justify-center mt-2 z-40">
            {/* video on/off button */}
            <button onClick={pauseVideo} type="button" className="ui icon button">
              <i aria-hidden="true" className="play icon" />
            </button>
            {/* audio on/off button */}
            <button onClick={mute} type="button" className="ui icon button">
              <i aria-hidden="true" className="microphone icon" />
            </button>
          </div>
        </Container>
        {/* <Container maxWidth="sm">
          <StyledImage src={props.user ? props.user.imageurl : user.avatar} />
        </Container> */}
<Container maxWidth="sm">
        {peers.length >= 1 && (
          // <Slider {...settings} style={{ width: '300px', height: '200px', backgroundColor: '#' }}>
          peers.map((peer, index) => {
            const { userID } = peer;
            return (
              <div>
                {/* <Typography variant="h4" component="h6" style={{ float: 'left', color: '#2d2e2e' }}>{index + 1}</Typography> */}
                <Video key={userID} peer={peer} />
              </div>
            );
          })
          // </Slider>
        )}
        </Container>
      </div>

    </div>
  );
};

export default Room;
