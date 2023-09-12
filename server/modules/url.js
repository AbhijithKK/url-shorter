import mongoose from "mongoose";

const URLS=mongoose.Schema({
    mainUrl:{
        type:String,
        requred:true
    },
    modifyedUrl:{
        type:String,
        requred:true
    }

})

const URLModel=mongoose.model('shorted-urls',URLS)
export default URLModel