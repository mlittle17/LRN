import React, {
  useState, MouseEvent, KeyboardEvent, useEffect, useRef,
} from 'react';
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget';
import axios from 'axios';

import 'react-chat-widget/lib/styles.css';

import socket from './Socket.jsx';

let user = {};

axios.get('/auth/exist')
  .then(res => {
    if (res.data === 'no one here') {
      console.log('I am not logged in');
    } else {
      console.log(res.data.username, 'I am logged in');
      user = (res.data);
    }
  })
  .catch(error => {
    console.log(error);
  });

const StudentChatWidget = (props) => {
  // const [user, setUser] = useState(props.user)
  // const [user, setUser] = useState({});

  useEffect(() => {
    // axios.get('/auth/exist')
    // .then(res => {
    //   if (res.data === 'no one here') {
    //     console.log('I am not logged in');
    //   } else {
    //     console.log(res.data.username, 'I am logged in');
    //     setUser(res.data);
    //   }
    // })
    // .catch(error => {
    //   console.log(error);
    // });

    socket.current.on('sending Instructor message', (msg) => {
      // setMessages((msgs) => [...msgs, msg]);
      addResponseMessage(msg);
    });

    socket.current.on('sending Student message', msgObj => {
      // console.log(msgObj, 'in student chat widget');
      checkIncomingMessage(msgObj);
    });
  }, []);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API]
    // socket.current.emit('chat message', messageObj);
    const messageObj = {
      message: newMessage,
      userEmail: user.email,
    };

    socket.current.emit('Student message', messageObj);
    // addResponseMessage('ok Caryn', 'Rachael');
  };

  const checkIncomingMessage = (msgObj) => {
    if (msgObj.userEmail != user.email) {
      addUserMessage(msgObj.message);
    }
    console.log(user, 'checkincomingmessage');
  };

  return (
    <div>
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="Questions?"
        subtitle="Ask them here"
      />
    </div>

  );
};

export default StudentChatWidget;
