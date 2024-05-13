import React, { useState } from 'react';
import './chat.css';
import io from 'socket.io-client';
import Chat from './chat';

const socket = io.connect('http://localhost:3017');

function Adminchat() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('123');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h2 style={{ color: 'gray' }}>Welcome!</h2>
          <input
            type="text"
            placeholder="Enter Your Name"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter The Room Id"
            value={room}
            disabled
            style={{ backgroundColor: 'lightgray' }}
          />
          <button className='btn' onClick={joinRoom} style={{ backgroundColor: 'gray', marginLeft: '-2px' }}>
            Start Chat
          </button>
        </div>
      ) : (
        <div>
          <Chat socket={socket} username={username} room={room} />
        </div>
      )}
    </div>
  );
}

export default Adminchat;
