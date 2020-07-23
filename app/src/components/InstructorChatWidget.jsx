import React, {
  useState, MouseEvent, KeyboardEvent, useEffect, useRef,
} from 'react';
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

import socket from './Socket.jsx';

const InstructorChatWidget = ({ user }) => {
  useEffect(() => {
    socket.current.on('sending Student message', msgObj => {
      // console.log(msgObj, 'in student chat widget');
      addResponseMessage(msgObj.message);
    });
  }, []);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API]
    // socket.current.emit('chat message', messageObj);
    socket.current.emit('Instructor message', newMessage);

    // addResponseMessage('ok Caryn', 'Rachael');
  };

  return (
    <div>
      <Widget
        handleNewUserMessage={handleNewUserMessage}
      />
    </div>

  );
};

export default InstructorChatWidget;
