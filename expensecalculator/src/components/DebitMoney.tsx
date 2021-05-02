import { Modal,Input, Button,InputNumber, message, DatePicker} from 'antd';
import React,{ useState } from 'react';
interface Iprops{
    setList:any,
    addSubstract:any,
}
export const DebitMoney:React.FC<Iprops> = (props:Iprops) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [amount,setAmount]=useState<number>(0)
  const [description,setDescription]=useState<string>("")
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if(amount<=0){
        message.error("Amount should be greater than zero")
    }
    if(description===""){
        message.error("description cannot be empty")
    }
    if(description!=="" && amount>0){
        const currentDate=new Date().toLocaleTimeString()
        props.addSubstract(amount,"debit")
        props.setList(amount,description,"debit",currentDate)
        setIsModalVisible(false);
    }
    setAmount(0)
    setDescription("")
  };

  const handleCancel = () => {
    setAmount(0)
    setDescription("")
    setIsModalVisible(false);
  };
 

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Debit
      </Button>
      <Modal title="Debit Money" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}> 
      <p style={{float:"right",color:"red"}}>All fields are required</p>
    <InputNumber style={{width:"100%"}} defaultValue={0} autoFocus={true} onChange={(value)=>{
        setAmount(value)
    }} />
    <Input  placeholder="Enter the description" value={description} onChange={(e)=>{
        setDescription(e.target.value)
    }} />
      </Modal>
    </>
  );
};
