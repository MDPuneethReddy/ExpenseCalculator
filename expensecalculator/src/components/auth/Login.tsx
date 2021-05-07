import React from "react"
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { navigate, RouteComponentProps } from "@reach/router";
import { auth } from "../firebase";


interface Iprops extends RouteComponentProps{

}
export const Login:React.FC<Iprops>=(props:Iprops)=>{
    const onFinish = (values: any) => {
      console.log(values)
      auth.signInWithEmailAndPassword(values.user.email,values.password).then((result)=>{
        console.log(result)
        message.success("Successfully logged In")
        navigate("/",{state:{user:result.user?.email}})
      }).catch(error=>{
        message.error(error.message)
      })
      };
      
    
    return(
        <div style={{textAlign: "center"}}>
        <h1 >Login Page</h1>
        <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item name={['user', 'email']}rules={[{ type: 'email' }]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="./registration">register now!</a>
      </Form.Item>
    </Form>
    </div>
    )
}