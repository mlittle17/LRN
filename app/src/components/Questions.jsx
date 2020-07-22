import React, {
  useState, MouseEvent, KeyboardEvent, useEffect, useRef,
} from 'react';
import io from 'socket.io-client';
import { Widget, addResponseMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

import socket from './Socket.jsx';

// const user = {
//   username: 'Jerry',
// };

const Questions = ({ user }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    socket.current.on('sending chat message', (msg) => {
      setMessages((msgs) => [...msgs, msg]);
    });
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
    setMessage(''); // clear the input
  };

  const onKeyPress = (event) => {
    if (event.which === 13) sendChat(event);
  };

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API]
    addResponseMessage('ok Caryn', 'Rachael');
  };

  return (

    <div>
      <div>
        <Widget
          handleNewUserMessage={handleNewUserMessage}
        />
      </div>
      {messages.map((msg) => {
        const key = msg.messageCount + msg.user.id;
        return (
          <div key={key}>
            <p>
              {`${msg.user.username}: ${msg.message}`}
            </p>
          </div>
        );
      })}
      <br />
      <input id="chat-input" value={message} onKeyPress={onKeyPress} onChange={(e) => setMessage(e.target.value)} type="text" />
      <br />
      <button onClick={(e) => sendChat(e)} type="button">Send</button>
      <br />
    </div>
  );
};

export default Questions;
