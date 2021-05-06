import { Button, message, Space, Table} from "antd";
import { DeleteOutlined,EditOutlined,FilePdfOutlined} from '@ant-design/icons';
import { useReactToPrint } from 'react-to-print';
import {CSVLink} from "react-csv"
import React, { useRef } from "react"
interface Iprops{
    myList:any,
    setMyList:any,
}
export const PrintList:React.FC<Iprops>=(props:Iprops)=>{
  const componentRef = useRef<any>();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
    const deleteRecord=(id:any)=>{
        // console.log(props.myList)
        // props.setMyList(props.myList.splice(id,1))
    }
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date'
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
                <Button type="primary" shape="circle" ><EditOutlined /></Button>
                <Button danger type="primary" shape="circle"onClick={()=>{
                    deleteRecord(record.id)
                }}><DeleteOutlined /></Button>
              </Space>
            ),
          },
        
    ]
    console.log(props.myList)
    return(
      <div style={{width:"100%"}} >
        <Space style={{float:"right"}}>
          <Button type="primary">
        <CSVLink
              filename={"Expense_Table.csv"}
              data={props.myList}
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
        <div ref={componentRef}>
        {props.myList && 
        <Table  defaultExpandAllRows={true} columns={columns} dataSource={props.myList} />
        }
        </div>
        </div>
    )
}