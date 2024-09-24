import React, { useState } from 'react'
import { Card } from 'antd'
import { Button, Form, Input, Switch } from 'antd';
import {ReactComponent as Languages} from '../../assets/Languages.svg';
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [form] = Form.useForm();
  const [loginOrRegister, setloginOrRegister] = useState(true)
  let navigate = useNavigate();

  function handle_register() {
    setloginOrRegister(!loginOrRegister)
  }
  function handle_language() {
    return navigate("/language");
  }
  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen'>
        <Card className="flex justify-center space-y-4" style={{
              width: 330,
              height: 436,
              margin: "20px",
              borderRadius: "20px",
              overflow: "hidden",
        }}>
            {loginOrRegister ? (<>
                <div className='flex justify-center pb-6 pt-4'>
                <h1 className='text-3xl font-semibold text-[#446FB1]'>Login</h1>
            </div>
            <Form
                layout={'horizontal'}
                form={form}
                variant={'filled'}
                initialValues={{ layout: 'horizontal' }}
                //onValuesChange={}
                >
                <Form.Item >
                    <Input style={{height: '45px', width: '257px'}} placeholder="Username" />
                </Form.Item>
                <Form.Item >
                    <Input style={{height: '45px', width: '257px'}} className='from_field' placeholder="Password" />
                </Form.Item>
                <Form.Item style={{ marginBottom: "37px" }} valuePropName="checked">
                    <div className='flow-root '>
                        <p className='float-left pl-4 text-[#446FB1]'>Remeber Me</p>
                        <div className='pr-4 float-right'>
                            <Switch />
                        </div>
                    </div>
                </Form.Item>
                <Form.Item style={{ marginBottom: "16px"}} className='flex items-center justify-center'>
                    <Button style={{
                            width: '171px',
                            height: '46px',
                            borderRadius: "100px",
                            overflow: "hidden",
                            backgroundImage: "linear-gradient(to right, #80A1D4, #75C9C8)",
                             }} type="primary">Login
                    </Button>
                </Form.Item>
                
            </Form>
            <div className='flex items-center justify-center pb-20'>
                    <Button style={{
                            width: '120px',
                            height: '30px',
                            borderRadius: "100px",
                            overflow: "hidden",
                             backgroundImage: "linear-gradient(to right, #80A1D4, #75C9C8)",
                             }} 
                             onClick={handle_register}
                             type="primary">
                            Register
                    </Button>
            </div>
            </>) : (<>
                <div className='flex justify-center pb-6 pt-4'>
                <h1 className='text-3xl font-semibold text-[#446FB1]'>Register</h1>
            </div>
            <Form
                layout={'horizontal'}
                form={form}
                variant={'filled'}
                initialValues={{ layout: 'horizontal' }}
                //onValuesChange={}
                >
                <Form.Item >
                    <Input style={{height: '45px', width: '257px'}} placeholder="Username" />
                </Form.Item>
                <Form.Item >
                    <Input style={{height: '45px', width: '257px'}} placeholder="Password" />
                </Form.Item>
                <Form.Item >
                    <Input style={{height: '45px', width: '257px'}} placeholder="Repeat Password" />
                </Form.Item>
                <Form.Item style={{ marginBottom: "16px"}} className='flex items-center justify-center'>
                    <Button style={{
                            width: '171px',
                            height: '46px',
                            borderRadius: "100px",
                            overflow: "hidden",
                            backgroundImage: "linear-gradient(to right, #80A1D4, #75C9C8)",
                             }} type="primary">Register
                    </Button>
                </Form.Item>
                
            </Form>
            <div className='flex items-center justify-center pb-20'>
                    <Button style={{
                            width: '120px',
                            height: '30px',
                            borderRadius: "100px",
                            overflow: "hidden",
                             backgroundImage: "linear-gradient(to right, #80A1D4, #75C9C8)",
                             }} 
                             onClick={handle_register}
                             type="primary">
                            Login
                    </Button>
            </div>
            </>) }
            
        </Card>
        
        <Button color="default" variant="link" onClick={handle_language}>
            <Languages/>
            <p className='float-left pl-4 text-white font-semibold'>Change Language</p>          
        </Button>
        
    </div>
  )
}

export default Login