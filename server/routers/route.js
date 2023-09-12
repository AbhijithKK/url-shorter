import { Router } from "express";
import { Auth, LogOut, Login, PostUrl, SignUp } from "../controllers/controller.js";
const route=Router()

route.post('/signup',SignUp)
route.post('/login',Login)
route.post('/url',PostUrl)

route.get('/auth',Auth)
route.get('/logout',LogOut)
export default route

