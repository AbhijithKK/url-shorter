import React, { useEffect, useState } from 'react'
import { Auth } from '../Api/Api'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoutes({route}) {
  const [auth,setAuth]=useState(true)
  const ApiHelper=async()=>{
    const data=await Auth()
    // setAuth(data?.success)
  }
  useEffect(()=>{
    ApiHelper()
  },[])
  return (
    <div>
      {auth ? <Outlet/>:<Navigate to={route}/>}
    </div>
  )
}

export default PrivateRoutes
