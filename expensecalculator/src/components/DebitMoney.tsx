import { Modal,Input, Button,InputNumber, message,Dropdown, Menu} from 'antd';
import React,{ useState } from 'react';
import { MinusOutlined,} from '@ant-design/icons';
import {  DropDown } from './DropDown';
interface Iprops{
    setList:any,
    addSubstract:any,
}
export const DebitMoney:React.FC<Iprops> = (props:Iprops) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [amount,setAmount]=useState<string>("")
  const [description,setDescription]=useState<string>("")
  const [categories,setCategories]=useState<Array<any>>(["Food","Shopping"])
  const [category,setCategory]=useState<string>("")
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if(amount===""){
        message.error("Amount should be greater than zero")
    }
    if(typeof amount==="string"){
      message.error("Amount should be number and greater than zero")
    }
    if(description===""){
        message.error("description cannot be empty")
    }
    if(category===""){
      message.error("choose a category or create new category")
    }
    if(description!=="" && +amount>0 && category!==""){
        const currentDate=new Date().toLocaleTimeString()
        props.addSubstract(amount,"Debit")
        props.setList(amount,description,"Debit",currentDate,category)
        setIsModalVisible(false);
    }
    setAmount("")
    setDescription("")
    setCategory("")
  };

  const handleCancel = () => {
    setAmount("")
    setDescription("")
    setCategory("")
    setIsModalVisible(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal} danger>
        Debit<MinusOutlined />
      </Button>
      <Modal title="Debit Money" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div style={{float:"right",color:"red"}}>
      <p >All fields are required</p>
      </div>
      <DropDown categories={categories} setCategories={setCategories} setCategory={setCategory} />
      <Input  placeholder="Enter the Number" value={amount} autoFocus={true} onChange={(e)=>{
        setAmount(e.target.value)
      }} />
      <Input  placeholder="Enter the description" value={description} onChange={(e)=>{
        setDescription(e.target.value)
      }} />
      </Modal>
    </>
  );
};
