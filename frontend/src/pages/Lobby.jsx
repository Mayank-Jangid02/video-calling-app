import React,{useState,useEffect,useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSocket} from '../context/SocketProvider.jsx'
export default function lobby() {

    let [room, setRoom] = useState('');
    let [email, setEmail] = useState('');
    const socket=useSocket();
    const navigate=useNavigate();
    console.log(socket);
   const handlesubmit =  useCallback((e)=>{
    e.preventDefault();
    socket.emit('join_room',{email,room});
    // console.log(email,room);
    handleJoinRoom({email,room});
   },[room,email,socket])

   const handleJoinRoom=useCallback((data)=>{
    const {email,room}=data;
    navigate(`/room/${room}`); 
   },[navigate]);
   useEffect(()=>{
     socket.on('room:join',handleJoinRoom);
     return ()=>{socket.off('room:join',handleJoinRoom)}
   },[socket])
  return (
    <div className='w-full flex justify-center item-center'>
        <h1>lobby</h1>
        
     <form onSubmit={handlesubmit} className='flex item-center item-center'>

        <input type="email" name='email' placeholder='rohit@gmail.com' onChange={(e)=>{setEmail(e.target.value)}}/>
        <input type="text" name = 'room' placeholder='room number' onChange={(e)=>{setRoom(e.target.value)}} />
        <br />
        <button>join</button>
     </form>
    </div>
  )
}
