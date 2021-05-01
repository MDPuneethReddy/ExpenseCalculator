import { Form,Modal,Input, Button,InputNumber, message} from 'antd';
import React,{ useState } from 'react';
interface Iprops{
    setList:any,
    addSubstract:any,
}
export const CreditMoney:React.FC<Iprops> = (props:Iprops) => {
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
    if(amount>0 && description!==""){
        props.addSubstract(amount,"credit")
        props.setList(amount,description)
        setAmount(0)
        setDescription("")
        setIsModalVisible(false);
    }
    
  };

  const handleCancel = () => {
    setAmount(0)
    setDescription("")
    setIsModalVisible(false);
  };
 

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Credit
      </Button>
      <Modal title="Add Money" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}> 
      <p style={{float:"right",color:"red"}}> * All fields are required</p>
    <InputNumber style={{width:"100%"}} defaultValue={0} autoFocus={true} onChange={(value)=>{
        setAmount(value)
    }} />
    <Input placeholder="Enter the description" value={description} onChange={(e)=>{
        setDescription(e.target.value)
    }} />
      </Modal>
    </>
  );
};
