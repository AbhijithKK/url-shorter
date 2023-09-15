import jwt from 'jsonwebtoken'
// import crypto from 'crypto'


export const jwtSign=async(data)=>{
  const hash=await  jwt.sign({data:data},process.env.JWT_SECRECT_KEY,{algorithm:'ES256'})
  return hash
}
export const jwtVerify=async(hash)=>{
  const data=await  jwt.verify(hash,process.env.JWT_SECRECT_KEY,{algorithm:'ES256'})
  return data
}