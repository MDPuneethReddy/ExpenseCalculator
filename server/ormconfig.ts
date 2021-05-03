import { expenseLog } from "./entities/ExpenseLog";

export default[{
    name:"development",
    type: process.env.REACT_TYPEORM_TYPE ,
    host: process.env.REACT_TYPEORM_HOST,
    port: process.env.REACT_TYPEORM_PORT,
    username: process.env.REACT_TYPEORM_USERNAME,
    password: process.env.REACT_TYPEORM_PASSWORD,
    database: process.env.REACT_TYPEORM_DATABASE,
    entities: [expenseLog],
    synchronize: true,
    logging: false
  },{
    name:"test",
    type:"sqlite",
    database:":memory:",
    entities:[expenseLog],
    logging:true,
    synchronize:true
  }]