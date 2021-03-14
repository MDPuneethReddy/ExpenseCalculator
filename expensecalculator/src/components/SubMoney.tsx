import { Button, Input, InputNumber, Modal } from "antd"
import * as React from "react"
interface Iprops{
    amount:number,
    setAmount:any,
    myList:Array<any>,
    setMyList:any,
}
export const SubMoney:React.FC<Iprops>=(props:Iprops)=>{
    const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
    const [description,setDescription]=React.useState<string>("")
    const [value,setValue]=React.useState<number>(0)
    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
          const newList=[...props.myList,{
            amount:value,
            description:description,
            type:"debit"
          }]
          props.setMyList(newList)
          props.setAmount(props.amount-value)
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
      function onChange(value:number) {
       setValue(value)
      }
    return(
        <div>
        <Button type="primary" onClick={showModal}>
        SubMoney
      </Button>
      <Modal title="Dedit Money" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input  type="text" value={description} placeholder="small description"  onChange={(e)=>{
            setDescription( e.target.value)
        }}></Input>
        <InputNumber style={{ width: '100%'}} min={1}  placeholder="Input a number" onChange={onChange} />
      </Modal>
      </div>
    )
}