import React,{createContext,useMemo} from 'react'
import {io} from 'socket.io-client'
const SocketContext = createContext(null);
const socket= useMemo(()=>io('localhost:8000'),[]);

export const  SocketProvider=(props)=>{
return (
    <SocketContext.Provider value={props.value}>
        {props.children}
    </SocketContext.Provider>
)
}
export const useSocket=()=>{
    const socket=useContext(SocketContext);
    if(!socket){
        throw new Error('Socket not found')
    }
    return socket
}