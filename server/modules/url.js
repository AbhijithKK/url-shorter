import mongoose from "mongoose";

const URLS=mongoose.Schema({
    mainUrl:{
        type:String,
        requred:true
    },
    modifyedUrl:{
        type:String,
        requred:true
    },
    urlId:{
        type:String,
        requred:true
    },
    userId:{
        type:String,
        requred:true
    },

})

const URLModel=mongoose.model('urls',URLS)
export default URLModel