import Axios from 'axios'


export const Axioss = Axios.create({
    baseURL: 'http://localhost:5001',
    headers: {'Content-Type':'application/json'},
    withCredentials:true
  });