import * as express from "express"
import * as cors from "cors"
import { connection } from "./connection/connection"
require('dotenv').config()
const app=express()
app.use(cors())
const PORT=process.env.REACT_PORT || 3333
app.get("/api",(req,res)=>{
    res.send("Welcome to backend API")
})
app.listen(PORT,()=>{
    console.log(` server running on ${PORT}`)
})
connection.then((connection:any)=>{
    console.log("connected")
})