import mongoose from "mongoose";

export const Db=async()=>{
    try {
     let connect=await   mongoose.connect(process.env.DB,{
            dbName:process.env.DB_NAME,
            autoIndex:true
        })
        if (connect) {
            console.log('server connected');
        }
    } catch (error) {
        console.log('Mongoose eonnection error');
    }
}