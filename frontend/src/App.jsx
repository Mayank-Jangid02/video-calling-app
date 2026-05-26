import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Lobby from './pages/Lobby.jsx'
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Lobby/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
