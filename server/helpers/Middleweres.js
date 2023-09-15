import signUpModel from "../modules/signUp"
import { jwtVerify } from "./Jwt"

export const Middlewere=async(req,res,next)=>{
    let data=req.cookie('user')
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
}