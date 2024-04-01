import express from 'express'
import { Google, login, signUp } from '../controllers/authcontroller.js'

const router=express.Router()
router.post('/signUp',signUp)
router.post('/login',login)
router.post('/googleAuth',Google)

export default router