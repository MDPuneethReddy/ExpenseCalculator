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
        const expenseLog=await expenseRepository.find({where:{email:email}})
        res.send({
            message:"success",
            payload:expenseLog
    })
    })
    app.post("/api/expenseLog",async (req,res)=>{
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
        console.log("creditget",creditCategory)
        if(creditCategory.length===0){
            const body={
                        email:email,
                        category:"Funds"
            }
            const creditCategory=creditCategoryRepository.create(body)
            const result = await creditCategoryRepository.save(creditCategory);
            let allCreditCategory=await creditCategoryRepository.find({where:{email:email}})

            console.log("result",result)
            res.send({
                message:"success",
                payload:allCreditCategory
            })
        }
        else{
        res.send({
            message:"success",
            payload:creditCategory
        })
    }
    })
    app.put("/api/creditCategory",async(req,res)=>{
        const email=req.headers.email
        const value=req.body.value
        const creditCategory=await creditCategoryRepository.find({where:{email:email}})
        console.log("creditCategory",creditCategory)
        let temp=[...creditCategory]
        temp[0].category.push(value)
        creditCategoryRepository.merge(creditCategory,temp)
        const result = await creditCategoryRepository.save(creditCategory);
        res.send({
            message:"success",
            payload: result
        })
    // }
    })
    app.get("/api/debitCategory",async(req,res)=>{
        const email=req.headers.email
        let debitCategory=await debitCategoryRepository.find({where:{email:email}})
        console.log("debitCategory",debitCategory)
        if(debitCategory.length===0){
            const body={
                email:email,
                category:"Food"
    }
    const debitCategory=debitCategoryRepository.create(body)
    const result = await debitCategoryRepository.save(debitCategory);
    let allDebitCategory=await debitCategoryRepository.find({where:{email:email}})
    res.send({
        message:"success",
        payload:allDebitCategory
    })
        }
        else{
        res.send({
            message:"success",
            payload:debitCategory
        })
    }
    })
    app.put("/api/debitCategory",async(req,res)=>{
        const email=req.headers.email
        const value=req.body.value
        const debitCategory=await debitCategoryRepository.find({where:{email:email}})
        let temp=[...debitCategory]
        temp[0].category.push(value)
        debitCategoryRepository.merge(debitCategory,temp)
        const result = await debitCategoryRepository.save(debitCategory);
        res.send({
            message:"success",
            payload: result
        })
    // }
    })
}).catch(error=>{
    console.log(error)
})