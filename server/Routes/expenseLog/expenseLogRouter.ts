import * as express from "express"
import { connection } from "../../connection/connection"
import { expenseLog } from "./expenseLog"
const expenseLogRouter=express.Router()
connection.then((connection:any)=>{
    console.log("connected")
    const expenseRepository=connection.getRepository(expenseLog)
    expenseLogRouter.get("/",async (req,res)=>{
        const email=req.headers.email
        const expenseLog=await expenseRepository.find({where:{email:email}})
        res.send({
            message:"success",
            payload:expenseLog
        })
    })
    expenseLogRouter.post("/",async (req,res)=>{
        const expense=await expenseRepository.create(req.body)
        const result = await expenseRepository.save(expense);
        res.send({
            message:"success",
            payload:result
        })
    })
    expenseLogRouter.delete("/",async(req,res)=>{
        const id=req.headers.id
        const email=req.headers.email
        const expenseLogDelete=await expenseRepository.delete(id)
        res.json({
            message:"success",
        })
    })
    expenseLogRouter.get("/getEachCredit",async(req,res)=>{
        const {email}=req.headers
        const queryResult = await expenseRepository
        .createQueryBuilder()
        .select("category")
        .where("email = :email And type= :type",{email:email,type:"Credit"})
        .addSelect("SUM(amount)", "creditsum")
        .groupBy("category")
        .getRawMany();
            res.send({
                message:"success",
                payload:queryResult
            })
        })
    expenseLogRouter.get("/getEachDebit",async(req,res)=>{
        const {email}=req.headers
        const queryResult = await expenseRepository
        .createQueryBuilder()
        .select("category")
        .where("email = :email And type= :type",{email:email,type:"Debit"})
        .addSelect("SUM(amount)", "debitsum")
        .groupBy("category")
        .getRawMany();
            res.send({
                message:"success",
                payload:queryResult
            })
        })
        
}).catch(error=>{
    console.log(error)
})
export {expenseLogRouter}