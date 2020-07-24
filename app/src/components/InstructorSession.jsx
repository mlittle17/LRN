import React, { useRef, useEffect, useState } from 'react';
import Peer from 'simple-peer';

// the video style

import Slider from 'react-slick';
import {
  Grid, Typography, Avatar, Paper, Container, IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicNoneOutlinedIcon from '@material-ui/icons/MicNoneOutlined';
import MicOffOutlinedIcon from '@material-ui/icons/MicOffOutlined';

import { StyledVideo } from '../styles/StyledComponents.jsx';
import Board from './Board.jsx';
// import Video from './Video.jsx';
// import Questions from './Questions.jsx';
import InstructorChatWidget from './InstructorChatWidget.jsx';
import socket from './Socket.jsx';

import '../styles/Upcoming.css';

const useStyles = makeStyles((theme) => ({
  border: 'none',
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    flexGrow: 1,
  },
  paper: {
    border: 'none',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

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
  const classes = useStyles();

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
      <div className={classes.root}>
        <Grid container spacing={1}>
          {/* <Grid item xs={12}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Grid> */}
          <Grid item xs={8} container>
            <Grid item xs={4}>
              <Paper className={classes.paper} elevation={0}>
                <StyledVideo muted ref={userVideo} autoPlay playsInline />
                {videoSwitch
                  && (
                    <IconButton aria-label="pause" onClick={pauseVideo}>
                      <VideocamIcon />
                    </IconButton>
                  )
                  || (
                    <IconButton aria-label="pause" onClick={pauseVideo}>
                      <VideocamOffIcon />
                    </IconButton>
                  )}

                {audioSwitch
                  && (
                    <IconButton aria-label="pause" onClick={mute}>
                      <MicNoneOutlinedIcon />
                    </IconButton>
                  )
                  || (
                    <IconButton aria-label="pause" onClick={mute}>
                      <MicOffOutlinedIcon />
                    </IconButton>
                  )}

              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper className={classes.paper} elevation={0}>
                <h1> Event Name </h1>
                <a href={joinLink}>Here is the student join link</a>
                <a>(open in new tab for testing)</a>
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Board />
            </Grid>
          </Grid>
          <Grid item xs={3}>
            {peers.length >= 1 && (
              peers.map((peer, index) => {
                return (
                  <Paper className={classes.paper} elevation={0}>
                    <Video key={index} peer={peer} style={{ height: 150, width: 300 }} />
                  </Paper>
                );
              })
            )}
          </Grid>
        </Grid>
      </div>

      <InstructorChatWidget user={props.user} />
    </Container>
  );
};

export default InstructorSession;
