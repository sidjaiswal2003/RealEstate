import express from 'express'
import { test } from '../controllers/userC.js'
const route=express.Router()
route.get('/test',test)

export default route