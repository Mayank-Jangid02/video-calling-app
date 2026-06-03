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
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Your browser does not support mediaDevices.getUserMedia. Please use HTTPS or localhost.");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true , video: true});
      setMystream(stream);
      const offer = await Peer.getOffer();  
      socket.emit('user:call', {to:remoteSocketId, offer}); 
    } catch (err) {
      console.error("Error in handleCallUser:", err);
      alert("Could not get media stream: " + err.message);
    }
  }, [ remoteSocketId, socket]);
 const handleIncomingCall= useCallback(async({from,offer})=>{
  setRemoteSocketId(from);
  const stream= await navigator.mediaDevices.getUserMedia({
    audio:true,
    video:true
  });
   console.log('Incoming Call',from,offer);
   const ans=await Peer.getAnswer(offer);
   socket.emit('call:accepted',{to:from,ans});
 },[socket]);
 
 
 const handleCallAccepted= useCallback(async({from,ans})=>{
   Peer.setLocalDescription(ans);
   console.log("Call Accepted",from,ans);
 },[])
  useEffect(() => {
    socket.on('user:joined', handleUserJoined);
    socket.on('incoming:call', handleIncomingCall);
    socket.on('call:accepted', handleCallAccepted);
    return () => { socket.off('user:joined', handleUserJoined)
     socket.off('incoming:call', handleIncomingCall)
     socket.off('call:accepted', handleCallAccepted) 
     }
  }, [socket, handleUserJoined])

  // Effect to attach the MediaStream to the video element
  useEffect(() => {
    if (mystream && myVideoRef.current) {
      myVideoRef.current.srcObject = mystream;
      myVideoRef.current.play().catch(e => console.error("Error playing video:", e));
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
          playsInline
          height='300px' 
          width='400px' 
        />
      )}
    </div>
  )
}
