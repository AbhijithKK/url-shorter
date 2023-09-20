import { Router } from "express";
import { Auth, LogOut, Login, PostUrl, PrevUrl, SignUp, redirector } from "../controllers/controller.js";
import { Middlewere } from "../helpers/Middleweres.js";
const route=Router()

route.post('/signup',SignUp)
route.post('/login',Login)
route.post('/url',Middlewere,PostUrl)

route.get('/auth',Auth)
route.get('/prevurl',Middlewere,PrevUrl)
route.get('/logout',LogOut)
route.get('/:id',redirector)
export default route
   
