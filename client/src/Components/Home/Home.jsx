import React, { useEffect, useState } from "react";
import { LogoutApi, PrevUrlApi, URLApi } from "../../Api/Api";
import "./Home.css";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { CopyToClipboard } from "react-copy-to-clipboard";
import { useNavigate } from "react-router-dom";
function Home() {
  const [prevURL, setPrevURL] = useState([]);
  const [copyed, setCopy] = useState(false);
  const [copyed1, setCopy1] = useState(false);
  const [shortUrl, setShortUrl] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [url, setUrl] = useState("");
  const UrlSubmit = async () => {
    if (
      url.trim() &&
      (url.startsWith("http://") || url.startsWith("https://"))
    ) {
      setErrMsg("");

      const data = await URLApi(url);
      setShortUrl(data?.newURL);
    } else {
      setErrMsg("plese Paste any url link");
    }
  };
  const [pageNo,setPageNo]=useState(1)
  const ApiCall=async(pageNo=1)=>{
    const data=await PrevUrlApi(pageNo)
    setPageNo(data?.pages)
    setPrevURL(data?.data)
  }
  useEffect(()=>{
    ApiCall()
   
  },[copyed]) 

  useEffect(()=>{
    setTimeout(() => {
        setCopy(false)
    }, 5000);
  },[copyed])
  useEffect(()=>{
    setTimeout(() => {
        setCopy1(false)
    }, 5000);
  },[copyed1])
  const GetPage=(event,newPage)=>{
   
    setPageNo(newPage)
    ApiCall(newPage)
  }
  const Nav=useNavigate()
  const Logout=async()=>{
   const data=await LogoutApi()
   console.log(data);
   if (data?.success) {
    Nav('/login')
   }
  }
  return (
    <div className="background">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>

        <div className="logout-btn">
        <button onClick={Logout}>Logout</button>
        </div>
      <div className="home-input">
        <div className="result">
          <p>{errMsg}</p>
          <input
            type="text"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="  Paste url"
            minLength={8}
            maxLength={500}
            required={true}
          />
          <br />
          <button type="button" onClick={UrlSubmit} placeholder="Submit">
            submit
          </button>
          
        </div>
        <div className="result1">
          <p className="clip">
            {shortUrl}
          </p>
          <CopyToClipboard text={shortUrl} onCopy={() => setCopy(true)}>
            
              <button style={{backgroundColor:copyed?'green':''}}>{copyed ?"URL copyed " : "copy"}</button>
          </CopyToClipboard>
        </div>
        <div className="all-urls">
            <u><h4 style={{color:'yellow'}}>Previous URLs</h4></u>
            <div className="all-url-sub">
                {prevURL ?
                prevURL.map((urls,i)=>(
                    <div className="all-url-sub1" key={i}>
                    <p>{urls.modifyedUrl}</p>
            <CopyToClipboard text={urls.modifyedUrl} onCopy={() => setCopy1({status:true,id:urls._id})}>
            
              <button style={{backgroundColor:copyed1?.status?urls._id===copyed1?.id ?'green':'':''}}>copy</button>
          </CopyToClipboard>
                    </div>
                ))

               :'(empty)' }
            
          <Stack  style={{marginTop:'5px'}}>
      
      <Pagination count={pageNo} onChange={GetPage} color="primary" />
      
    </Stack>
            </div>
        </div>
      </div>
      
    </div>
  );
}

export default Home;
