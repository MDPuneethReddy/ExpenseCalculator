import { Modal,Input, Button, message} from 'antd';
import React,{ useEffect, useState } from 'react';
import { MinusOutlined,} from '@ant-design/icons';
import {  DropDown } from './DropDown';
import axios from 'axios';
interface Iprops{
    setList:any,
    addSubstract:any,
    currentUser:any
}
export const DebitMoney:React.FC<Iprops> = (props:Iprops) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [amount,setAmount]=useState<number>(0)
  const [description,setDescription]=useState<string>("")
  const [categories,setCategories]=useState<Array<any>>([])
  const [category,setCategory]=useState<string>("")
  const [selected,setSelected]=useState<any>()

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
    if(category===""){
      message.error("choose a category or create new category")
    }
    if(description!=="" && amount>0 && category!==""){
        props.addSubstract(amount,"Debit")
        props.setList(amount,description,"Debit",category)
        setIsModalVisible(false);
    }
    setAmount(0)
    setDescription("")
    setCategory("")
    setSelected(null)
  };

  const handleCancel = () => {
    setAmount(0)
    setDescription("")
    setCategory("")
    setIsModalVisible(false);
    setSelected(null)
  };

  const getCategories=async(user:any)=>{
    axios.get("http://localhost:3333/api/debitCategory",{
        headers:{
            email:user
        }
    }).then((response:any)=>{
            console.log("getdebitcategories",response)
            if(response.data.payload.length===0){
              setCategories([])
            }
            else{
            setCategories(response.data.payload[0].category)
            }
            }).catch((error:any)=>{
            console.log(error)
        })
}

const addDebitCategory=(value:any)=>{
  axios.put("http://localhost:3333/api/debitCategory",{
      value:value
  },{
    headers:{
      email:props.currentUser
    }
  }).then(async (response:any)=>{
      console.log(response)
      setCategories(response.data.payload.category)
  }).catch((error:any)=>{
      console.log(error)
  })
}

useEffect(() => {
  getCategories(props.currentUser)
 }, [props.currentUser])
 console.log("debit categories",categories)

  return (
    <>
      <Button type="primary" onClick={showModal} danger>
        Debit<MinusOutlined />
      </Button>
      <Modal title="Debit Money" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div style={{float:"right",color:"red"}}>
      <p > * All fields are required</p>
      </div>
      <DropDown categories={categories} setCategories={addDebitCategory} setCategory={setCategory} selected={selected} setSelected={setSelected}/>
      <Input style={{width:"100%"}} value={amount}defaultValue={0} autoFocus={true} onChange={(e)=>{
        setAmount(+e.target.value)
      }} />
      <Input  placeholder="Enter the description" value={description} onChange={(e)=>{
        setDescription(e.target.value)
      }} />
      </Modal>
    </>
  );
};
