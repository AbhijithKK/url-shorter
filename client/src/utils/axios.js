import Axios from 'axios'


export const Axioss = Axios.create({
    baseURL: 'http://localhost:4000',
    headers: {'Content-Type':'application/json'},
    withCredentials:true
  });