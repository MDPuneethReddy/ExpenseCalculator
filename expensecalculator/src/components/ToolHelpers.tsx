import {  message } from "antd"
import React from "react"
import {CSVLink} from "react-csv"
interface Iprops{
  myList:any
}
export const ToolHelpers:React.FC<Iprops>=(props:Iprops)=>{
    return(
        <div>
            <CSVLink
              filename={"Expense_Table.csv"}
              data={props.myList}
              className="btn btn-primary"
              onClick={()=>{
                message.success("The file is downloading")
              }}
            >
              Export to CSV
            </CSVLink>
        </div>
    )
}