import { Alert } from "antd"
import * as React from "react"
interface Iprops{
    myList:Array<any>
}
export const PrintList:React.FC<Iprops>=(props:Iprops)=>{
    console.log(props.myList)
    return(
        <div>
           
            {props.myList.length>0 && props.myList.map((item,index)=>{
                
                return(
                    <div>
                        {item.type==="credit" ?
                    <Alert
      message={item.amount} 
      key={index}
      description={item.description}
      type="success"
    />
    :
    <Alert
      message={item.amount}
      description={item.description}
      key={index}
      type="error" />
                }
                </div>
            )
            })}
            
        </div>
    )
}