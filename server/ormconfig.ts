import { expenseLog } from "./Routes/expenseLog/expenseLog";
import {creditCategory} from "./Routes/creditCategory/creditCategory"
import { debitCategory } from "./Routes/debitCategory/debitCategory";
import { totalExpense } from "./Routes/totalExpenses/totalExpense";
export default[{
    name:"development",
    type: process.env.REACT_TYPEORM_TYPE ,
    host: process.env.REACT_TYPEORM_HOST,
    port: process.env.REACT_TYPEORM_PORT,
    username: process.env.REACT_TYPEORM_USERNAME,
    password: process.env.REACT_TYPEORM_PASSWORD,
    database: process.env.REACT_TYPEORM_DATABASE,
    entities: [expenseLog,creditCategory,debitCategory,totalExpense],
    synchronize: true,
    logging: false
  },{
    name:"test",
    type:"sqlite",
    database:":memory:",
    entities:[expenseLog,creditCategory,debitCategory,totalExpense],
    logging:false,
    synchronize:true
  }]