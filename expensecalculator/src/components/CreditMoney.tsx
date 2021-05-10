import { Modal,Input, Button,InputNumber, message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React,{ useEffect, useState } from 'react';
import { DropDown } from './DropDown';
import axios from 'axios';
interface Iprops{
    setList:any,
    addSubstract:any,
    currentUser:any
}
export const CreditMoney:React.FC<Iprops> = (props:Iprops) => {
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
        props.addSubstract(amount,"Credit")
        props.setList(amount,description,"Credit",category)
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
    axios.get("http://localhost:3333/api/creditCategory",{
        headers:{
            email:user
        }
    }).then((response:any)=>{
            console.log("getcreditcategories",response)
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
const addCreditCategory=(value:any)=>{
  axios.put("http://localhost:3333/api/creditCategory",{
      value:value
  },{
    headers:{
      email:props.currentUser
    }
  }).then(async (response:any)=>{
      console.log(response)
      setCategories(response.data.payload[0].category)
  }).catch((error:any)=>{
      console.log(error)
  })
}
  useEffect(() => {
   getCategories(props.currentUser)
  }, [props.currentUser])
  console.log("credit categories",categories)
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Credit<PlusOutlined />
      </Button>
      <Modal title="Add Money" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}> 
      <p style={{float:"right",color:"red"}}> * All fields are required</p>
      <DropDown categories={categories} setCategories={addCreditCategory} setCategory={setCategory} selected={selected} setSelected={setSelected}/>

    <Input style={{width:"100%"}} defaultValue={0} value={amount} autoFocus={true} onChange={(e)=>{
        setAmount(+e.target.value)
    }} />
    <Input placeholder="Enter the description" value={description} onChange={(e)=>{
        setDescription(e.target.value)
    }} />
      </Modal>
    </>
  );
};
