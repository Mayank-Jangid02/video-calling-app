import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Lobby from './pages/Lobby.jsx'
import Room from './screen/Room.jsx'   
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Lobby/>}/>
          <Route path='/room/:roomId' element={<Room/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
