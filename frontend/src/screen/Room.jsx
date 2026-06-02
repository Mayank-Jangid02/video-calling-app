import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useSocket } from '../context/SocketProvider.jsx'
import Peer from '../service/Peer.js'
export default function Room() {
  const socket = useSocket();
  const [mystream, setMystream] = useState(null);
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const myVideoRef = useRef(null);

  const handleUserJoined = useCallback(({ email, Id }) => {
    console.log(`${email} joined`);
    setRemoteSocketId(Id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true , video: true});
    const offer=await Peer.getOffer();  
    socket.emit('user:call',{to:remoteSocketId,offer}); 
    setMystream(stream);
  }, [ remoteSocketId, socket]);

  useEffect(() => {
    socket.on('user:joined', handleUserJoined);
    return () => { socket.off('user:joined', handleUserJoined) }
  }, [socket, handleUserJoined])

  // Effect to attach the MediaStream to the video element
  useEffect(() => {
    if (mystream && myVideoRef.current) {
      myVideoRef.current.srcObject = mystream;
    }
  }, [mystream]);

  return (
    <div>
      <h1>Room page</h1>
      <h2>{remoteSocketId ? 'User joined' : 'No user joined'}</h2>
      {remoteSocketId && <button onClick={handleCallUser}>Call</button>}
      {mystream && (
        <video 
          ref={myVideoRef} 
          autoPlay 
          muted 
          height='300px' 
          width='400px' 
        />
      )}
    </div>
  )
}
