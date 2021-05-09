import { navigate, RouteComponentProps } from '@reach/router';
import { Col, Row } from 'antd'
import React,{useEffect, useState} from 'react'
import { CreditMoney } from './CreditMoney';
import { DebitMoney } from './DebitMoney';
import { PrintList } from './PrintList';
import axios from "axios"
import { SignOut } from './SignOut';
interface Iprops extends RouteComponentProps{
    location?:any
}
export const Main:React.FC<Iprops>=(props:Iprops)=>{
    const [currentUser,setCurrentUser]=useState()
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
    const getData=async (user:any)=>{
        console.log(user)
        axios.get("http://localhost:3333/api/expenseLog",{
            headers:{
                email:user
            }
        }).then((response:any)=>{
                console.log("getResponse",response)
                setMyList(response.data.payload)
            }).catch((error:any)=>{
                console.log(error)
            })
    }
    const setList=async (amount:number,description:string,type:string, category?:string)=>{
        axios.post("http://localhost:3333/api/expenseLog",{
            email:currentUser,
            amount:amount,
            description:description,
            type:type,
            category:category
        }).then(async (response:any)=>{
            console.log(response)
            await getData(currentUser)
        }).catch((error:any)=>{
            console.log(error)
        })
        console.log(myList)
    }
    console.log("currentuser",currentUser)
    useEffect(()=>{
        console.log(props)
        if( props.location.state  && typeof props.location.state.user!=="undefined"){
            setCurrentUser(props.location.state.user)
        }
        else if(typeof currentUser==="undefined"){
            navigate("/login")
        }
        // getData(currentUser)
    },[])
    useEffect(() => {
       getData(currentUser)
    }, [currentUser])
    return(
        <div style={{width:"100%"}}>
            <Row >
            <Col style={{textAlign:"center",width:"90%"}}>
            <h1 >Balance : {amount}</h1>
            </Col>
            <Col style={{textAlign:"right",width:"10%"}}>
            <SignOut currentUser={currentUser} setCurrentUser={setCurrentUser}/>    
            </Col>
           </Row>
           <Row >  
               <Col span={12} style={{textAlign:"center"}}>
                   <CreditMoney setList={setList} addSubstract={addSubstractAmount} currentUser={currentUser}/>
               </Col>
               <Col span={12} style={{textAlign:"center"}}>
                   <DebitMoney setList={setList} addSubstract={addSubstractAmount} />
               </Col>       
           </Row>
           <Row style={{paddingTop:"10px",paddingBottom:"10px"}}>
               <Col span={12} style={{textAlign:"center"}}><h3>Total Credit - {totalCreditAmount}</h3></Col>
               <Col span={12} style={{textAlign:"center"}}><h3>Total Debit -{totalDebitAmount}</h3></Col>
           </Row>
            <Row>
                <PrintList myList={myList} setMyList={setMyList}/>
            </Row>
        </div>
    )
}