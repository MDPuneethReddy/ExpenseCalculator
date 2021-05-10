import * as express from "express"
import { connection } from "../../connection/connection"
import { creditCategory } from "./creditCategory"
const creditCategoryRouter=express.Router()
connection.then(connection=>{
    const creditCategoryRepository=connection.getRepository(creditCategory)
    creditCategoryRouter.get("/",async(req,res)=>{
        const email=req.headers.email as string
        let creditCategory=await creditCategoryRepository.find({where:{email:email}})
        console.log("creditget",creditCategory)
        if(creditCategory.length===0){
            const body={
                        email:email,
                        category:["Funds"]
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
    creditCategoryRouter.put("/",async(req,res)=>{
        const email=req.headers.email
        const value=req.body.value
        const creditCategory=await creditCategoryRepository.findOne({where:{email:email}})
        console.log("creditCategory",creditCategory)
        let temp=creditCategory
        temp[0].category.push(value)
        creditCategoryRepository.merge(creditCategory,temp)
        const result = await creditCategoryRepository.save(creditCategory);
        res.send({
            message:"success",
            payload: result
        })
    })
}).catch(error=>{
    console.log(error)
})
export {creditCategoryRouter}