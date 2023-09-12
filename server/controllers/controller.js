import { Sanitize } from "../helpers/helpers.js"
import signUpModel from "../modules/signUp.js"

export const SignUp=async(req,res)=>{
    try {
        const {password}=req.body
        const name=await Sanitize(req.body.name)
        const email=await Sanitize(req.body.email)
        
        const data=await signUpModel.create({
            name:name,
            email:email,
            password:password
        })

    } catch (error) {
        
    }
}
export const Login=async(req,res)=>{
    try {
        res.json('new')
    } catch (error) {
        
    }
}
export const Auth=async(req,res)=>{
    try {
        res.json('new')
    } catch (error) {
        
    }
}
export const PostUrl=async(req,res)=>{
    try {
        res.json('new')
    } catch (error) {
        
    }
}
export const LogOut=async(req,res)=>{
    try {
        res.json('new')
    } catch (error) {
        
    }
}