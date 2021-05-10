import * as express from "express"
import * as cors from "cors"
import { debitCategoryRouter } from "./Routes/debitCategory/debtiCategoryRouter"
import { creditCategoryRouter } from "./Routes/creditCategory/creditCategoryRouter"
import { expenseLogRouter } from "./Routes/expenseLog/expenseLogRouter"
require('dotenv').config()
const app=express()
app.use(cors())
app.use(express.json())
app.use("/api/expenseLog",expenseLogRouter)
app.use("/api/creditCategory",creditCategoryRouter)
app.use("/api/debitCategory",debitCategoryRouter)
const PORT=process.env.REACT_PORT || 3333
app.get("/api",(req,res)=>{
    res.send("Welcome to backend API")
})
app.listen(PORT,()=>{
    console.log(` server running on ${PORT}`)
})
