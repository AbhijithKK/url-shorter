import React, { useState } from 'react'
import './Signup.css'
import { useForm } from '../../utils/useForm'
import {SignupApi}from '../../Api/Api'
import { Link } from 'react-router-dom'
function Signup() {
  const [errMsg,setErrMsg]=useState('')
  const[value,setValues]=useForm({
    name:'',
    email:'',
    password:''
  })
  const Submit=async()=>{
    if (value.name.trim()&&value.email.trim()&&value.password.trim()) {
      setErrMsg('')
    const data=await SignupApi(value.email,value.name,value.password)
    }else{
      setErrMsg('Fill the form properly')
    }
  }
  return (
    <div>
     <div className="container">
      <div className="form">
        
        <div className="elements">
          <div className='header'>
            Sign Up
          </div>
          <p style={{
            textAlign:'center',
            color:"red",
            marginBottom:'10px',
            marginTop:'10px'
          }} >{errMsg}</p>
          <input type='text' value={value.name} onChange={setValues} className='element1' placeholder='Enter full Name' name='name'  minLength={3} maxLength={50} required={true} /><br/>
          <input type='email' value={value.email} onChange={setValues} className='element2' placeholder='Enter Your email' name='email'  minLength={3} maxLength={50} required={true} /><br/>
          <input type='password' value={value.password} onChange={setValues} className='element3' placeholder='Enter New password' name='password'  minLength={3} maxLength={50} required={true} />
          <br/>
          <button type='button' onClick={Submit} placeholder='Submit'>Signup</button>
          <div className='or'>
            <h4>OR</h4>
          </div>
          <div className='signUp-bottom'>
          <button style={{backgroundColor:'white',color:"black",fontWeight:'100px'}}>Signup with google</button>
          <Link to={'/login'}>  <p>Already have an account?</p></Link>
        </div>
        </div>
        
      </div>
     </div>
    </div>
  )
}
export default Signup
