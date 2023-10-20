import Axios from 'axios'

export const Axioss = Axios.create({
    baseURL: process.env.REACT_APP_GURL,
    headers: {'Content-Type':'application/json'},
    withCredentials:true
  });