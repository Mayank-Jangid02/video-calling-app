import React ,{useEffect,useState} from 'react'
import {useSocket} from '../context/SocketProvider.jsx'
export default function Room() {
    const socket=useSocket();
    useEffect(()=>{},[])
  return (
    <div>Room pages</div>
  )
}
