import React from 'react'
import { Routes, Route } from "react-router-dom"
import StartAnimation from './pages/StartAnimation'
import Login from './pages/Login'
import Home from './pages/Home'
import Protect from "./protect/Protect";
import Register from './pages/Register'
import FillOTP from './pages/FillOTP'

const App = () => {
  return (
    <Routes>
      
      <Route path='/' element={<StartAnimation />} />
      <Route path='/home' element={
        <Protect>
          <Home />
        </Protect>
      } />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />


      <Route path='/otp' element={<FillOTP />} />
    </Routes>
  )
}

export default App