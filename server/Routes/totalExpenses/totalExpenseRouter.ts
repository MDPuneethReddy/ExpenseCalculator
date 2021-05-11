import * as express from "express"
import { connection } from "../../connection/connection"
import { totalExpense } from "./totalExpense"
const totalExpenseRouter=express.Router()
connection.then(connection=>{
    const totalExpenseRepository=connection.getRepository(totalExpense)
    totalExpenseRouter.get("/",async(req,res)=>{
        const email=req.headers.email as string
        let totalExpense=await totalExpenseRepository.find({where:{email:email}})
        console.log("totalget",totalExpense)
        if(totalExpense.length===0){
            const body={
                        email:email,
                        totalAmount:0,
                        totalDebit:0,
                        totalCredit:0
                    }
            const totalExpense=totalExpenseRepository.create(body)
            const result = await totalExpenseRepository.save(totalExpense);
            let newTotalExpense=await totalExpenseRepository.find({where:{email:email}})
            console.log("result",result)
            res.send({
                message:"success",
                payload:newTotalExpense
            })
        }
        else{
            res.send({
                message:"success",
                payload:totalExpense
            })
        }
    })
    totalExpenseRouter.put("/",async(req,res)=>{
        const email=req.body.email
        const value=req.body.value
        const type=req.body.type
        const totalExpense=await totalExpenseRepository.findOne({where:{email:email}})
        console.log("totalExpense put",totalExpense)
        let temp=totalExpense
        if(type==="Credit"){
            temp.totalCredit=temp.totalCredit+value
            temp.totalAmount=temp.totalAmount+value
        }
        else{
            temp.totalDebit=temp.totalDebit+value
            temp.totalAmount=temp.totalAmount-value
        }
        totalExpenseRepository.merge(totalExpense,temp)
        const result = await totalExpenseRepository.save(totalExpense);
        res.send({
            message:"success",
            payload: result
        })
    })
    totalExpenseRouter.put("/removeDelete",async(req,res)=>{
        console.log(req.body)
        const totalExpense=await totalExpenseRepository.findOne({where:{email:req.body.email}})
        let temp=totalExpense
        if(req.body.type==="Credit"){
            temp.totalAmount=temp.totalAmount-req.body.amount
            temp.totalCredit=temp.totalCredit-req.body.amount
        }
        else{
            temp.totalAmount=temp.totalAmount+req.body.amount
            temp.totalDebit=temp.totalDebit-req.body.amount
        }
        totalExpenseRepository.merge(totalExpense,temp)
        const result = await totalExpenseRepository.save(totalExpense);
        res.send({
            message:"success",
            payload: result
        })
    })
}).catch(error=>{
    console.log(error)
})
export {totalExpenseRouter}