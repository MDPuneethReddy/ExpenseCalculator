import { Col,Row, Space } from 'antd'
import React,{useState} from 'react'
import { CreditMoney } from './CreditMoney';
import { DebitMoney } from './DebitMoney';
import { PrintList } from './PrintList';
export const Main:React.FC=()=>{
    const [amount,setAmount]=useState<number>(0)
    const [myList,setMyList]=useState<Array<any>>([])
    const addSubstractAmount=(value:number,type:string)=>{
        type==="credit"?
        setAmount(amount+value): setAmount(amount-value)
    }
    const setList=(amount:number,description:string,type:string, date:string)=>{
        let newEntity={
            id:myList.length+1,
            amount:amount,
            description:description,
            type:type,
            date:date,
        }
        setMyList([...myList, newEntity])
        console.log(myList)
    }
    return(
        <div >
            <Row >
                <div style={{width:"100%"}}>Balance : {amount}</div> 
           </Row>
           <Row>  
               <Col span={12}>
                   <CreditMoney setList={setList} addSubstract={addSubstractAmount} />
               </Col>
               <Col span={12}>
                   <DebitMoney setList={setList} addSubstract={addSubstractAmount}/>
               </Col>
               
           </Row>
            <Row >
                <PrintList myList={myList} setMyList={setMyList}/>
            </Row>
        </div>
    )
}