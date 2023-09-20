import React from 'react'
import PrivateRoutes from './PrivateRoutes'
import { Route, Routes } from 'react-router-dom'
import Home from '../Components/Home/Home'
import For04 from './For04'

function Routers() {
  return (
    <div>
      
       <Routes>
       <Route element={<PrivateRoutes route={'/login'} />} > 
       <Route path='/home'element={<Home/>} /> 
       </Route>
       <Route path='/*'element={<For04/>} /> 
    </Routes>
    </div>
  )
}

export default Routers
