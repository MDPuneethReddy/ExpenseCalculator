import * as express from "express"
import * as cors from "cors"
import { debitCategoryRouter } from "./Routes/debitCategory/debtiCategoryRouter"
import { creditCategoryRouter } from "./Routes/creditCategory/creditCategoryRouter"
import { expenseLogRouter } from "./Routes/expenseLog/expenseLogRouter"
import { totalExpenseRouter } from "./Routes/totalExpenses/totalExpenseRouter"
import { connection } from "./connection/connection"
require('dotenv').config()
const app=express()
app.use(cors())
app.use(express.json())
app.use("/api/expenseLog",expenseLogRouter)
app.use("/api/creditCategory",creditCategoryRouter)
app.use("/api/debitCategory",debitCategoryRouter)
app.use("/api/totalExpense",totalExpenseRouter)
const PORT=process.env.PORT || 3333
app.get("/api",(req,res)=>{
    res.send("Welcome to backend API")
})
app.listen(PORT,()=>{
    console.log(` server running on ${PORT}`)
})
connection.then(connection=>{
    console.log("connected")
})
