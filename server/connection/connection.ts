import { createConnection } from "typeorm"
require('dotenv').config()
const mode=process.env.REACT_DB_MODE || "development"
console.log(mode)
export const connection=
    createConnection(mode)