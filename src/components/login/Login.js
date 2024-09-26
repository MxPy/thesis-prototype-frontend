import React, { useState, useEffect } from 'react'
import { Card } from 'antd'
import { Button, Form, Input, Switch } from 'antd';
import {ReactComponent as Languages} from '../../assets/Languages.svg';
import { useNavigate } from "react-router-dom";
import DefaultApi from '../../api/src/api/DefaultApi';
import { AuthApi } from '../../api/src';
import User from '../../api/src/model/User';
import UserLogin from '../../api/src/model/UserLogin';


const Login = () => {
  const [form] = Form.useForm();
  const [loginOrRegister, setloginOrRegister] = useState(true)
  const [showRessetPasswordModal, setshowRessetPasswordModal] = useState(false)
  const [passwordCode, setpasswordCode] = useState("0000")
  let navigate = useNavigate();
  const auth = new AuthApi();

  function handle_register() {
    setloginOrRegister(!loginOrRegister)
  }

  function handle_proceed() {
    setshowRessetPasswordModal(false)
    setloginOrRegister(true)
  }

  function handle_register_request(value) {
    console.log(value)
    if(value.password != value.password2){
        console.log("chuhuhujiuj");
        return
    }
    const user = new User(value.username, value.password)
    auth.registerAuthRegisterPost(user).then((response) => {
        console.log(response);
        setpasswordCode(response.password_reset_code)
        setshowRessetPasswordModal(true)
      })
      .catch((error) => {
        console.log(error);
    });
  }

  function setCookie(key, value, expirationDate) {
    try {
      let cookieString = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      
      if (expirationDate) {
        const date = new Date(expirationDate);
        if (isNaN(date.getTime())) {
          throw new Error("Nieprawidłowa data wygaśnięcia");
        }
        cookieString += `; expires=${date.toUTCString()}`;
      }
      
      cookieString += "; path=/";
      
      document.cookie = cookieString;
      console.log("Próba ustawienia ciasteczka:", cookieString);
      
      // Sprawdź, czy ciasteczko zostało ustawione
      setTimeout(() => {
        if (document.cookie.split(';').some(item => item.trim().startsWith(`${encodeURIComponent(key)}=`))) {
          console.log("Ciasteczko zostało pomyślnie ustawione");
        } else {
          console.error("Nie można potwierdzić ustawienia ciasteczka");
        }
      }, 100);
  
    } catch (error) {
      console.error("Błąd podczas ustawiania ciasteczka:", error);
    }
  }

  function handle_login_request(value) {
    console.log(value);
    
    const user = new UserLogin(value.username, value.password)
    auth.loginAuthLoginPost(user).then((response) => {
        console.log(response.data.expiration_date, response.response.headers.session_id);
        setCookie("token", response.response.headers.session_id, response.data.expiration_date)
        //return navigate("/")
      })
      .catch((error) => {
        console.log(error);
    });
  }

  const def = new DefaultApi();

  useEffect(() => {
    console.log(showRessetPasswordModal)
    def.healthCheckHealthGetWithHttpInfo().then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
    });
  }, [])
  

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
                onFinish={handle_login_request}
                >
                <Form.Item name={"username"} required={true}>
                    <Input style={{height: '45px', width: '257px'}} placeholder="Username" />
                </Form.Item>
                <Form.Item name={"password"} required={true}>
                    <Input.Password style={{height: '45px', width: '257px'}} placeholder="Password" />
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
                    <Button htmlType="submit"  style={{
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
            </>) : (<>{showRessetPasswordModal ? (<>
                    <h1 className='text-3xl text-center font-bold text-[#ff3636] pb-6'>Register</h1>
                    <p className='text-xl text-center pb-10'>
                    The following code is used to reset your password, save it in a safe place as you will not receive it a second time
                    </p>
                    <p className='text-5xl font-bold text-center pb-12'>
                        {passwordCode}
                    </p>
                    <div className='flex items-center justify-center'>
                        <Button onClick={handle_proceed} style={{
                                width: '200px',
                                height: '60px',
                                borderRadius: "100px",
                                overflow: "hidden",
                                backgroundImage: "linear-gradient(to right, #80A1D4, #75C9C8)",
                                }} type="primary">Proceed
                        </Button>
                    </div>
                    
                </> ):(<>
                    <div className='flex justify-center pb-6 pt-4'>
                    <h1 className='text-3xl font-semibold text-[#446FB1]'>Register</h1>
                    </div>
                    <Form
                        layout={'horizontal'}
                        form={form}
                        variant={'filled'}
                        initialValues={{ layout: 'horizontal' }}
                        onFinish={handle_register_request}
                        >
                        <Form.Item name={"username"} required={true}>
                            <Input style={{height: '45px', width: '257px'}} placeholder="Username" />
                        </Form.Item>
                        <Form.Item name={"password"} required={true}>
                            <Input.Password style={{height: '45px', width: '257px'}} placeholder="Password" />
                        </Form.Item>
                        <Form.Item name={"password2"} required={true}>
                            <Input.Password style={{height: '45px', width: '257px'}} placeholder="Repeat Password" />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: "16px"}} className='flex items-center justify-center'>
                            <Button htmlType="submit" style={{
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
                        
                </> )}
                
            </>) }
            
        </Card>
        
        <Button color="default" variant="link" disabled={showRessetPasswordModal} onClick={handle_language}>
            <Languages/>
            <p className='float-left pl-4 text-white font-semibold'>Change Language</p>          
        </Button>
        
    </div>
  )
}

export default Login