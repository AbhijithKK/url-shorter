import signUpModel from "../modules/signUp.js"
import { jwtVerify } from "./Jwt.js"

export const Middlewere=async(req,res,next)=>{
    try {
   
    let data=req.cookies.user
    if (data) {
        let verify=await jwtVerify(data)
        let user =await signUpModel.findOne({_id:verify?.data?.data})
        if (user!=null) {
            next()
        }else
        res.json({error:true})
    }else{
        res.json({error:true})
    }
         
} catch (error) {
   
    res.json({error:true})
}
}