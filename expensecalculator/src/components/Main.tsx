import { Col,Row } from 'antd'
import React,{useState} from 'react'
import { CreditMoney } from './CreditMoney';
import { DebitMoney } from './DebitMoney';
import { PrintList } from './PrintList';
export const Main:React.FC=()=>{
    const [amount,setAmount]=useState<number>(0)
    const [myList,setMyList]=useState<Array<any>>([])
    const [totalDebitAmount,setTotalDebitAmount]=useState<number>(0)
    const [totalCreditAmount,setTotalCreditAmount]=useState<number>(0)

    const addSubstractAmount=(value:number,type:string)=>{
        if(type==="Credit"){
        setAmount(amount+value)
        setTotalCreditAmount(totalCreditAmount+value)}
        else{ setAmount(amount-value)
            setTotalDebitAmount(totalDebitAmount+value)
        }
    }
    const setList=(amount:number,description:string,type:string, date:string,category?:string)=>{
        let newEntity={
            id:myList.length+1,
            amount:amount,
            description:description,
            type:type,
            date:date,
            category:category
        }
        setMyList([newEntity,...myList])
        console.log(myList)
    }
    return(
        <div >
            <Row >
                <div style={{width:"100%"}}><h1>Balance : {amount}</h1></div> 
           </Row>
           <Row>  
               <Col span={12}>
                   <CreditMoney setList={setList} addSubstract={addSubstractAmount} />
               </Col>
               <Col span={12}>
                   <DebitMoney setList={setList} addSubstract={addSubstractAmount} />
               </Col>       
           </Row>
           <Row style={{paddingTop:"10px",paddingBottom:"10px"}}>
               <Col span={12}><h3>Total Credit - {totalCreditAmount}</h3></Col>
               <Col span={12}><h3>Total Debit -{totalDebitAmount}</h3></Col>
           </Row>
            <Row>
                <PrintList myList={myList} setMyList={setMyList}/>
            </Row>
        </div>
    )
}