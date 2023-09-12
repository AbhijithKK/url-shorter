import  Express  from "express";
const app= Express()
import { configDotenv } from "dotenv";
configDotenv()
import { Db } from "./config/config.js";
import route from './routers/route.js'

Db()
app.use(route)
app.listen(process.env.PORT,()=>{
console.log(`CONNECTED PORT ${process.env.PORT}`);
})

