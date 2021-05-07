import React, { useState } from "react"
import { Form, Input, Button, message, } from 'antd';
import { RouteComponentProps } from "@reach/router";
import { auth } from "../firebase";
interface Iprops extends RouteComponentProps {
}
export const Registration=(props:Iprops)=>{  
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
   console.log(values)
   auth.createUserWithEmailAndPassword(values.email,values.password).then(result=>{
    console.log(result)
    message.success("Registered successfully")
   }).catch(error=>{
     message.error(error.message)
   })
   }
  const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
      
    return(
        <div style={{textAlign: "center"}}>
        <h1 >Registration</h1>
        <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        prefix: '91',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>     
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" >
          Register
        </Button>
        Already have an account <a href="./login">Login here!</a>
      </Form.Item>
    </Form>
        </div>
    )
}