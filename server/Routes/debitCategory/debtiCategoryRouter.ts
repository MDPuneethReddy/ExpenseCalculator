import * as express from "express"
import { connection } from "../../connection/connection"
import { debitCategory } from "./debitCategory"
const debitCategoryRouter=express.Router()
connection.then(connection=>{
    const debitCategoryRepository=connection.getRepository(debitCategory)
    debitCategoryRouter.get("/",async(req,res)=>{
        const email=req.headers.email as string
        let debitCategory=await debitCategoryRepository.find({where:{email:email}})
        console.log("debitCategory",debitCategory)
        if(debitCategory.length===0){
            const body={
                email:email,
                category:["Food"]
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
    debitCategoryRouter.put("/",async(req,res)=>{
        const email=req.headers.email
        const value=req.body.value
        const debitCategory=await debitCategoryRepository.findOne({where:{email:email}})
        let temp=debitCategory
        temp.category.push(value)
        debitCategoryRepository.merge(debitCategory,temp)
        const result = await debitCategoryRepository.save(debitCategory);
        res.send({
            message:"success",
            payload: result
        })
    })
}).catch(error=>{
    console.log(error)
})
export {debitCategoryRouter}