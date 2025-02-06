import express from 'express'
import { ProtectRoute } from '../middilware/auth.middileware.js'
import { getMessage, getUsersForSideBar, SendMessage } from '../controlls/message.controller.js'
const router=express.Router()

router.get('/users',ProtectRoute,getUsersForSideBar)
router.get('/:id',ProtectRoute,getMessage)
router.post('/send/:id',ProtectRoute,SendMessage)
export default router