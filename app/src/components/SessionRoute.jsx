import React, {
  useState, MouseEvent, KeyboardEvent, useEffect, useRef,
} from 'react';

import { Redirect, Route } from 'react-router-dom'

import Peer from 'simple-peer';
import socket from './Socket.jsx';
import styled from 'styled-components';


import InstructorSession from './InstructorSession.jsx';
import StudentSession from './StudentSession.jsx';

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const StyledVideo = styled.video`
position: static;
border: 1px solid #cddfe7;
bottom: 60px;
right: 40px;
box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
border-radius: 5px;
width: 300px;
`;



const SessionRoute = (props) => {
  const [joinCount, setJoinCount] = useState(0);
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const [userStream, setUserStream] = useState();
  const peersRef = useRef([]);
  const { roomID } = props.match.params;
  const [videoSwitch, setVideoSwitch] = useState(true);
  const [audioSwitch, setAudioSwitch] = useState(true);
  const [instructor, setInstructor] = useState(true);

  const userJoins = () => {
    setJoinCount(joinCount + 1);
  };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
      // userVideo.current.srcObject = stream;

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

    if(peers.length > 0) {
      setInstructor(false)
    }
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



  return (
    <div>



{instructor === true && <InstructorSession />}




    </div>
  );
};

export default SessionRoute;
