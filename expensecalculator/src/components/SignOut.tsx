import { navigate } from '@reach/router';
import { Button, Drawer, message, Tooltip} from 'antd';
import React, { useState } from 'react'
import { auth } from './firebase';
import { UserOutlined,LogoutOutlined } from '@ant-design/icons';
interface Iprops{
    currentUser:any
    setCurrentUser:any
}
export const SignOut:React.FC<Iprops>=(props:Iprops)=> {
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
      };
      const onClose = () => {
        setVisible(false);
      };

  return (
    <>
      <Tooltip title="" >
      <Button style={{backgroundColor:"gray"}}type="primary" shape="circle" onClick={showDrawer}>
       <UserOutlined /> 
      </Button>
      </Tooltip>
      <Drawer
        title="Profile"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >  
        <p>logged as</p>
        <h4 style={{backgroundColor:"lightgrey"}}> {props.currentUser}</h4>
           <Button size="small" type="primary" danger onClick={()=>{
                    auth.signOut().then(result=>{
                        console.log(result)
                        props.setCurrentUser(undefined)
                        navigate("/login")
                    }).catch(error=>{
                        message.error(error.message)
                    })
                }}><LogoutOutlined /> SignOut
            </Button>  
            </Drawer>
           
    </>
  );
};
