import mongoose from "mongoose";

const signUp=mongoose.Schema({
    name:{
        type:String,
        requred:true
    },
    email:{
        type:String,
        requred:true
    },
    password:{
        type:String,
        requred:true
    },
    gId:{
        type:String,
        
    }

})

const signUpModel=mongoose.model('user',signUp)
export default signUpModel