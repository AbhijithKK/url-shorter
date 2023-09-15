import { Router } from "express";
import { Auth, LogOut, Login, PostUrl, SignUp, redirector } from "../controllers/controller.js";
const route=Router()

route.post('/signup',SignUp)
route.post('/login',Login)
route.post('/url',PostUrl)

route.get('/auth',Auth)
route.get('/:q',redirector)
route.get('/logout',LogOut)
export default route

