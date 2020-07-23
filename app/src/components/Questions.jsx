import React, {
  useState, MouseEvent, KeyboardEvent, useEffect, useRef,
} from 'react';
import io from 'socket.io-client';
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

import socket from './Socket.jsx';

const Questions = ({ user }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    socket.current.on('sending chat message', (msg) => {
      setMessages((msgs) => [...msgs, msg]);
    });

    handleNewUserMessage('hello');
  }, []);

  const sendChat = (event) => {
    event.preventDefault();
    setMessageCount(messageCount + 1);
    const messageObj = {
      messageCount,
      message,
      user,
    };
    socket.current.emit('chat message', messageObj);
    setMessage(''); 
  };

  const onKeyPress = (event) => {
    if (event.which === 13) sendChat(event);
  };

  const renderAnInstructorMessage = (message) => {

  };

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API]
    // socket.current.emit('chat message', messageObj);

    addUserMessage('ok Caryn', 'Rachael');
  };

  return (

    <div>
      <div>
        <Widget
          handleNewUserMessage={handleNewUserMessage}
          title="Questions?"
          subtitle=""
          // profileAvatar={user.imageurl}
        />
      </div>
    </div>
  );
};

export default Questions;
