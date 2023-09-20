
import { Router } from 'express'
import { Gauth, RedirectUrl } from '../controllers/GoogleAuth.js'
const router=Router()




router.post('/Gauth',Gauth)
router.get('/auth',RedirectUrl)
export default router