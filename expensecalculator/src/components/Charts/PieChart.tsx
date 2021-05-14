import React, { useEffect, useState } from "react"
import { InitialState } from "../../store/reducer";
import {useSelector} from "react-redux"
import axios from "axios";
export const PieChart=()=>{
    const { currentUser } = useSelector<InitialState, InitialState>(
        (state: InitialState) => state
      );
      const [creditCategory,setCreditCategory]=useState<Array<any>>([])
      const [debitCategory,setDebitCategory]=useState<Array<any>>([])
    const getCreditCategoryData=()=>{
        axios.get("http://localhost:3333/api/expenseLog/getEachCredit",{
            headers:{
                email:currentUser
            }
        }).then(response=>{
            console.log(response,"creditEach")
            setCreditCategory(response.data.payload)
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
            setDebitCategory(response.data.payload)
        }).catch(error=>{
            console.log(error)
        })
    }
      useEffect(() => {
        getCreditCategoryData()
        getDebitCategoryData()
      }, [currentUser])
    return(
        <div>
            piechart
        </div>
    )
}