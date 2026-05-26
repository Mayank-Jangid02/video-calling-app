import React,{useState,useEffect,useCallback} from 'react'

export default function lobby() {

    let [room, setRoom] = useState('');
    let [email, setEmail] = useState('');
   const handlesubmit =  useCallback((e)=>{
    e.preventDefault();
    console.log(email,room);
   },[room,email])
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
