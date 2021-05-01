import React from "react"
interface Iprops{
    myList:any
}
export const PrintList:React.FC<Iprops>=(props:Iprops)=>{
    console.log(props.myList)
    return(
        <div>
            {props.myList.length>0 && props.myList.map((item:any)=>{
               return <li>{item.amount}{item.description}</li>
            })}
        </div>
    )
}