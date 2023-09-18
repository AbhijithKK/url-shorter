import React, { useState } from 'react'
import './Login.css'
import { LoginApi } from '../../Api/Api'
import { useForm } from '../../utils/useForm'
import { Link } from 'react-router-dom'
function Login() {
    const [errMsg,setErrMsg]=useState('')
  const[value,setValues]=useForm({
    email:'',
    password:''
  })
  const Submit=async()=>{
    if (value.email.trim()&&value.password.trim()) {
      setErrMsg('')
    const data=await LoginApi(value.email,value.password)
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
            Log In
          </div>
          <p style={{
            textAlign:'center',
            color:"red",
            marginBottom:'10px',
            marginTop:'10px'
          }} >{errMsg}</p>
          <input type='email' value={value.email} onChange={setValues} className='element2' placeholder='Enter Your email' name='email'  minLength={3} maxLength={50} required={true} /><br/>
          <input type='password' value={value.password} onChange={setValues} className='element3' placeholder='Enter New password' name='password'  minLength={3} maxLength={50} required={true} />
          <br/>
          <button type='button' onClick={Submit} placeholder='Submit'>Login</button>
          <div className='or'>
            <h4>OR</h4>
          </div>
          <div className='signUp-bottom'>
          <button style={{backgroundColor:'white',color:"black",fontWeight:'100px'}}>Login with google</button>
         <Link to={'/signup'}> <p>Create an account?</p></Link>
        </div>
        </div>
        
      </div>
     </div>
    </div>
  )
}

export default Login
