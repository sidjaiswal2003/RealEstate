import mongoose from "mongoose";
import express from 'express'

const db=(url)=>{
    mongoose.set("strictQuery",false)
    mongoose.connect(url)
}


export default db