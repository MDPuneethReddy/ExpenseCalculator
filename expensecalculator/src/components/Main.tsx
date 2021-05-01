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
    const setList=(value:any)=>{
        setMyList([...myList, value])
    }
    return(
        <div >
            <Row >
                {amount}
           </Row>
           <Row>
               <Space>
               <Col>
                   <CreditMoney setList={setList} addSubstract={addSubstractAmount} />
               </Col>
               <Col>
                   <DebitMoney setList={setList} addSubstract={addSubstractAmount}/>
               </Col>
               </Space>
           </Row>
            <Row>
                <PrintList myList={myList} />
            </Row>
        </div>
    )
}