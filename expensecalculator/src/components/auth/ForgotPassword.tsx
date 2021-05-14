import { navigate, RouteComponentProps } from "@reach/router"
import { Button, Form, Input } from "antd"
import React from "react"
import { UserOutlined } from '@ant-design/icons';
import firebase from "firebase";
interface Iprops extends RouteComponentProps{

}
export const ForgotPassword:React.FC<Iprops>=(props:Iprops)=>{
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
      const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      };
      const onFinish = (values: any) => {
        console.log('Success:', values);
        firebase.auth().sendPasswordResetEmail(values.user.email)
        navigate("/login")
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
    return(
        <div style={{textAlign:"center"}}>
            <h1>ForgotPassowrd</h1>
          <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item name={['user', 'email']}rules={[{ type: 'email' }]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>  
        </div>
    )
}
     
   