import React, { useEffect} from "react"
import { InitialState } from "../../store/reducer";
import {useDispatch, useSelector} from "react-redux"
import axios from "axios";
import { RouteComponentProps } from "@reach/router";
import { Row } from "antd";
import {  ResponsiveBarDebitChart } from "./ResponsiveBarDebitChart";
import { ResponsiveBarCreditChart } from "./ResposiveBarCreditChart";
import { updateEachCreditCategory, updateEachDebitCategory } from "../../store/dispatcher";
import { ResponsivePieDebitChart } from "./ResponsivePieDebitChart";
import { ResponsivePieCreditChart } from "./ResponsivePieCreditChart";
interface Iprops extends RouteComponentProps{

}
export const ChartsMain:React.FC<Iprops>=(props:Iprops)=>{
    const { currentUser } = useSelector<InitialState, InitialState>(
        (state: InitialState) => state
      );
      const dispatch = useDispatch()
    const getCreditCategoryData=()=>{
        axios.get("http://localhost:3333/api/expenseLog/getEachCredit",{
            headers:{
                email:currentUser
            }
        }).then(response=>{
            console.log(response,"creditEach")
            dispatch(updateEachDebitCategory(response.data.payload))
        }).catch(error=>{
            console.log(error)
        })
    }
    const getDebitCategoryData=()=>{
        axios.get("http://localhost:3333/api/expenseLog/getEachDebit",{
            headers:{
                email:currentUser
            }
        }).then(response=>{
            console.log(response,"debitEach")
            dispatch(updateEachCreditCategory(response.data.payload))
        }).catch(error=>{
            console.log(error)
        })
    }
      useEffect(() => {
        getCreditCategoryData()
        getDebitCategoryData()
      }, [currentUser])

    return(
        <div style={{backgroundColor:""}}>
            <Row style={{paddingBottom:"30px",height:400}}>
                <h1>Debit PieChart</h1>
                <ResponsivePieCreditChart getCreditCategoryData={getCreditCategoryData}/>
            </Row>
            <Row style={{paddingBottom:"50px",height:400}}>
                <h1>Debit BarChart</h1>
                <ResponsiveBarCreditChart getCreditCategoryData={getCreditCategoryData}/>
            </Row>
            <Row style={{paddingBottom:"30px",height:400}}>
                <h1>Credit PieChart</h1>
                <ResponsivePieDebitChart getDebitCategoryData={getDebitCategoryData}/>
            </Row>
            <Row style={{paddingBottom:"50px",height:400}}>
                <h1>Credit BarChart</h1>
                <ResponsiveBarDebitChart getDebitCategoryData={getDebitCategoryData}/>
            </Row>
            
        </div>
    )
}