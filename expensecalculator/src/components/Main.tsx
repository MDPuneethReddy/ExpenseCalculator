import { Button, Space } from 'antd'
import * as React from 'react'
import { AddMoney } from './AddMoney'
import { PrintList } from './PrintList'
import { SubMoney } from './SubMoney'
export const Main:React.FC=()=>{
    const [amount,setAmount]=React.useState<number>(0)
    const [myList,setMyList]=React.useState<Array<any>>([])
    return(
        <div >
            <h1>{amount}</h1>
           <Space>
            <AddMoney amount={amount} setAmount={setAmount} myList={myList} setMyList={setMyList}/>
            <SubMoney amount={amount} setAmount={setAmount} myList={myList} setMyList={setMyList}/>
            </Space>
            <PrintList myList={myList}/>
        </div>
    )
}
