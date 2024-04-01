import  express  from "express";
import db from './db/connect.js'
import dotenv from 'dotenv'
import authRoute from './router/user.js'
import auth from './router/authroute.js'
import { error } from "./middleware/errorHandling.js";
import cors from 'cors'

dotenv.config()
const app=express()
const port=2000

app.use(cors())
app.use(express.json())
app.use('/api',authRoute)
app.use('/api',auth)
app.use(error)
const start=async()=>{
    try {
        db(process.env.URL)
        app.listen(port,()=>{
            console.log('Mongo Connected')
        })
    } catch (error) {
        console.log(error)
        
    }
}
start()
