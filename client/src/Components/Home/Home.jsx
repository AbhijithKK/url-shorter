import React, { useEffect, useState } from "react";
import { PrevUrlApi, URLApi } from "../../Api/Api";
import "./Home.css";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { CopyToClipboard } from "react-copy-to-clipboard";
function Home() {
  const [prevURL, setPrevURL] = useState([]);
  const [copyed, setCopy] = useState(false);
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
      console.log(data);
      setShortUrl(data?.newURL);
    } else {
      setErrMsg("plese Paste any url link");
    }
  };
  const [pageNo,setPageNo]=useState(1)
  const ApiCall=async()=>{
    const data=await PrevUrlApi(pageNo)
    console.log(data,pageNo,'ff');
    setPageNo(data?.pages)
    setPrevURL(data?.data)
  }
  useEffect(()=>{
    ApiCall()
   
  },[]) 
  useEffect(()=>{
    setTimeout(() => {
        setCopy(false)
    }, 5000);
  },[copyed])
  const GetPage=(event,newPage)=>{
    setPageNo(newPage)
    ApiCall()
  }
  return (
    <div class="background">
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
                {prevURL.map((urls,i)=>(
                    <div className="all-url-sub1" key={i}>
                    <p>{urls.modifyedUrl}</p>
            <CopyToClipboard text={urls.modifyedUrl} onCopy={() => setCopy(true)}>
            
              <button style={{backgroundColor:copyed?urls._id ?'green':'':''}}>{copyed ?"URL copyed " : "copy"}</button>
          </CopyToClipboard>
                    </div>
                ))

                }
            
          <Stack  style={{marginTop:'5px'}}>
      
      <Pagination count={pageNo} onClick={GetPage} color="primary" />
      
    </Stack>
            </div>
        </div>
      </div>
      
    </div>
  );
}

export default Home;
