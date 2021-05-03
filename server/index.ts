import * as express from "express"
import * as cors from "cors"
require('dotenv').config()
const app=express()
app.use(cors())
const PORT=process.env.REACT_PORT || 3000

app.listen(PORT,()=>{
    console.log(` server running on ${PORT}`)
})