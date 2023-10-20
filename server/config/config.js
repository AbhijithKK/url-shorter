import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv()
export const Db=async()=>{
    try {
        console.log('hii',process.env.DB);
     let connect=await   mongoose.connect(process.env.DB)
        if (connect) {
            console.log('server connected');
        }
    } catch (error) {
        console.log('Mongoose Connection error',error);
    }
}


