import jwt from 'jsonwebtoken'
// import crypto from 'crypto'


export const jwtSign=async(data)=>{
    const hash=await jwt.sign({data:data},process.env.JWT_SECRECT_KEY,{algorithm:'HS256'})
   
  return hash
}
export const jwtVerify=async(hash)=>{
    try {
        console.log(hash,'hasgg');
        const data=await jwt.verify(hash,process.env.JWT_SECRECT_KEY,{algorithm:'HS256'})
        console.log(data);
        return data
    } catch (error) {
        console.log(error);
       
    }

}