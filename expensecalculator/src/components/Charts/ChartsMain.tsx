import React, { useEffect, useRef} from "react"
import { InitialState } from "../../store/reducer";
import {useDispatch, useSelector} from "react-redux"
import axios from "axios";
import { RouteComponentProps } from "@reach/router";
import { Button, Row, Tooltip } from "antd";
import {  ResponsiveBarDebitChart } from "./ResponsiveBarDebitChart";
import { ResponsiveBarCreditChart } from "./ResposiveBarCreditChart";
import { updateEachCreditCategory, updateEachDebitCategory } from "../../store/dispatcher";
import { ResponsivePieDebitChart } from "./ResponsivePieDebitChart";
import { ResponsivePieCreditChart } from "./ResponsivePieCreditChart";
import { useReactToPrint } from "react-to-print";
import { FilePdfOutlined} from '@ant-design/icons';
interface Iprops extends RouteComponentProps{

}
export const ChartsMain:React.FC<Iprops>=(props:Iprops)=>{
    const { currentUser } = useSelector<InitialState, InitialState>(
        (state: InitialState) => state
      );
      const url=process.env.REACT_APP_BACKEND_URL|| "http://localhost:3333"
      const dispatch = useDispatch()
      const componentRef = useRef<any>();
      const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
    const getCreditCategoryData=()=>{
        axios.get(`${url}/api/expenseLog/getEachCredit`,{
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
        axios.get(`${url}/api/expenseLog/getEachDebit`,{
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
        <div style={{backgroundColor:""}} ref={componentRef}>
            <Tooltip title="Export to PDF">
        <Button style={{float:"right"}}onClick={handlePrint} type="primary" danger><FilePdfOutlined /></Button>
        </Tooltip>
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