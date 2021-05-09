import * as express from "express"
import * as cors from "cors"
import { connection } from "./connection/connection"
import { expenseLog } from "./entities/ExpenseLog"
import { creditCategory } from "./entities/creditCategory"
import { debitCategory } from "./entities/debitCategory"
require('dotenv').config()
const app=express()
app.use(cors())
app.use(express.json())
const PORT=process.env.REACT_PORT || 3333
app.get("/api",(req,res)=>{
    res.send("Welcome to backend API")
})
app.listen(PORT,()=>{
    console.log(` server running on ${PORT}`)
})
connection.then((connection:any)=>{
    console.log("connected")
    const expenseRepository=connection.getRepository(expenseLog)
    const creditCategoryRepository=connection.getRepository(creditCategory)
    const debitCategoryRepository=connection.getRepository(debitCategory)
    app.get("/api/expenseLog",async (req,res)=>{
        const email=req.headers.email
        console.log(email)
        const expenseLog=await expenseRepository.find({where:{email:email}})
        console.log(expenseLog)
        res.send({
            message:"success",
            payload:expenseLog
    })
    })
    app.post("/api/expenseLog",async (req,res)=>{
        console.log("body",req.body)
        const expense=await expenseRepository.create(req.body)
        const result = await expenseRepository.save(expense);
        res.send({
            message:"success",
            payload:result
        })
    })
    app.get("/api/creditCategory",async(req,res)=>{
        const email=req.headers.email
        let creditCategory=await creditCategoryRepository.find({where:{email:email}})
        console.log("creditCategory",creditCategory)
        res.send({
            message:"success",
            payload:creditCategory
        })
    })
}).catch(error=>{
    console.log(error)
})