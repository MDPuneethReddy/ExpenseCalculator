import { Modal,Input, Button,InputNumber, message,Dropdown, Menu} from 'antd';
import React,{ useState } from 'react';
import { MinusOutlined,DownOutlined } from '@ant-design/icons';
interface Iprops{
    setList:any,
    addSubstract:any,
    categories:any,
}
export const DebitMoney:React.FC<Iprops> = (props:Iprops) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [amount,setAmount]=useState<number>(0)
  const [description,setDescription]=useState<string>("")
  const [category,setCategory]=useState<string>("")
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
        const currentDate=new Date().toLocaleTimeString()
        props.addSubstract(amount,"Debit")
        props.setList(amount,description,"Debit",currentDate,category)
        setIsModalVisible(false);
    }
    setAmount(0)
    setDescription("")
    setCategory("")
  };

  const handleCancel = () => {
    setAmount(0)
    setDescription("")
    setCategory("")
    setIsModalVisible(false);
  };
  const onClick = ({ key }:any) => {
    setCategory(props.categories[key])
  };
  const menu = (
    <Menu onClick={onClick}>
       {props.categories.map((category:any,index:any)=>{
    return <Menu.Item key={index}>{category}</Menu.Item>
  })}
    </Menu>
  );

  return (
    <>
      <Button type="primary" onClick={showModal} danger>
        Debit<MinusOutlined />
      </Button>
      <Modal title="Debit Money" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}> 
      <p style={{float:"right",color:"red"}}>All fields are required</p>
      <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
             {category===""? "Choose Category":category}  <DownOutlined />
            </a>
          </Dropdown>
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
