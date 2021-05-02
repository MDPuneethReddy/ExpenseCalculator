import { Button, Space, Table} from "antd";
import React from "react"
interface Iprops{
    myList:any,
    setMyList:any,
}
export const PrintList:React.FC<Iprops>=(props:Iprops)=>{
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
                {type==="credit"?<p style={{backgroundColor:"lightblue"}}>{type}</p>:<p style={{backgroundColor:"lightred"}}>{type}</p>}
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
                <Button >Edit</Button>
                <Button onClick={()=>{
                    deleteRecord(record.id)
                }}>Delete</Button>
              </Space>
            ),
          },
        
    ]
    console.log(props.myList)
    return(
        <div style={{width:"100%"}}>
            {props.myList && 
            <Table  defaultExpandAllRows={true} columns={columns} dataSource={props.myList} />
            }
        </div>
    )
}