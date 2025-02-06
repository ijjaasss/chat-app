import express from 'express'
import { chekAuth, login, logout, signup, updateProfile } from '../controlls/auth.controller.js'
import { ProtectRoute } from '../middilware/auth.middileware.js'
const router=express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.put('/update-profile',ProtectRoute,updateProfile)
router.get('/check',ProtectRoute,chekAuth)




export default router