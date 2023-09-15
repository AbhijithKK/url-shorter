import { Router } from "express";
import { Auth, LogOut, Login, PostUrl, SignUp, redirector } from "../controllers/controller.js";
import { Middlewere } from "../helpers/Middleweres.js";
const route=Router()

route.post('/signup',SignUp)
route.post('/login',Login)
route.post('/url',PostUrl)

route.get('/auth',Auth)
route.get('/:id',redirector)
route.get('/logout',LogOut)
export default route

