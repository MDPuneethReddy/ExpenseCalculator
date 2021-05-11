import { Button, message, Space, Table} from "antd";
import { DeleteOutlined,FilePdfOutlined} from '@ant-design/icons';
import { useReactToPrint } from 'react-to-print';
import {CSVLink} from "react-csv"
import React, { useRef } from "react"
import axios from "axios";
import { InitialState } from "../../store/reducer";
import {useSelector} from "react-redux"
interface Iprops{
    getData:any,
    getTotalExpenseData:any,
}
export const PrintList:React.FC<Iprops>=(props:Iprops)=>{
  const { currentUser,myList } = useSelector<InitialState, InitialState>(
    (state: InitialState) => state
  );
  const componentRef = useRef<any>();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const calculateTotalBalance=(record:any)=>{
    axios.put("http://localhost:3333/api/totalExpense/removeDelete",record).then(response=>{
      props.getTotalExpenseData(currentUser)
    }).catch(error=>{
      console.log(error)
    })
  }
    const deleteRecord=(record:any)=>{
        axios.delete("http://localhost:3333/api/expenseLog",{
          headers:{
            email: record.email,
            id:record.id
          }
        }).then(response=>{
          props.getData(record.email)
          calculateTotalBalance(record)
        }).then(error=>{
          console.log(error)
        })
    }
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render:(date:any)=>(
             <>
             {new Date(date).toLocaleTimeString()}
             </>
            )
          },
          {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
          },
          {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
          },
          {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render:(type:any)=>(
                <>
                {type==="Credit"?<p style={{paddingTop:"10px", color:"blue"}}>{type}</p>:<p style={{paddingTop:"10px", color:"red"}}>{type}</p>}
                </>
            )
          },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
    
        },
        {
            title: 'Action',
            key: 'action',
            render: (record:any) => (
              <Space size="middle">  
                {/* <Button type="primary" shape="circle" ><EditOutlined /></Button> */}
                <Button danger type="primary" shape="circle"onClick={()=>{
                    deleteRecord(record)
                }}><DeleteOutlined /></Button>
              </Space>
            ),
          },
        
    ]
    return(
      <div style={{width:"100%"}} >
        <Space style={{float:"right"}}>
          <Button type="primary">
        <CSVLink
              filename={"Expense_Table.csv"}
              data={myList}
              className="btn btn-primary"
              onClick={()=>{
                message.success("The file is downloading")
              }}
            >
              Export to CSV
            </CSVLink> 
            </Button>
        <Button onClick={handlePrint} type="primary" danger><FilePdfOutlined /> Export to PDF </Button>
        </Space>
        <div ref={componentRef} >
        {myList && 
        <Table  defaultExpandAllRows={true} columns={columns} dataSource={myList} />
        }
        </div>
        </div>
    )
}