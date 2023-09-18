import React, { useState } from 'react'
import { URLApi } from '../../Api/Api'

function Home() {
    const [errMsg,setErrMsg]=useState('')

    const [url,setUrl]=useState('')
    const UrlSubmit=async()=>{
        if (url.trim()&&(url.startsWith('http://')||url.startsWith('https://'))) {
            setErrMsg('')

            const data=await URLApi(url)
        }else{
            setErrMsg('plese Paste any url link')
        }
    }
  return (
    <div>
        <p>{errMsg}</p>
    <input type='text' value={url} onChange={(event)=>setUrl(event.target.value)}  placeholder='paste url'   minLength={8} maxLength={500} required={true} />
          <br/>
          <button type='button' onClick={UrlSubmit} placeholder='Submit'>submit</button>
         
    </div>
  )
}

export default Home
