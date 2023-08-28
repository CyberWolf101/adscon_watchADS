import React, { useEffect, useState } from 'react';
import { Fade, Slide } from 'react-reveal';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Spinner } from '@chakra-ui/react'
import Signup from '../components/signup';
import { UseSignup } from '../hooks/useSignup';
import { UseLogin } from '../hooks/useLogin';
import { Password } from '@mui/icons-material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config';
import useAuth from '../hooks/auth';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading } = UseLogin()
    const { user, isLoading: authLoading } = useAuth()
    const [authUser, error] = useAuthState(auth);
    const nav = useNavigate()
    useEffect(() => {
        if (authUser) {
            nav('/dashboard')
        } else {
            var userEmail = localStorage.getItem('email')
            if (userEmail) {
                setEmail(JSON.parse(userEmail))
            }
        }
    }, [])
    const hadleLogin = async (email, password) => {
        const success = await login({
            email: email,
            password: password,
            redirectTo: '/'
        });
    }
    return (
        <div className='login-page'>
            <div className="main-body login-contents">

                <div className='login-details rounded'>
                    <div className='p-5' >
                        <center>
                            <Tabs position="relative" variant="unstyled">
                                <TabList style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Tab>LOGIN</Tab>
                                    <Tab>SIGN UP</Tab>
                                </TabList>
                                <TabIndicator
                                    mt="-1.5px"
                                    height="2px"
                                    bg="white"
                                    borderRadius="1px"
                                />
                                <TabPanels>
                                    <TabPanel>
                                        <Fade>
                                            <form autoComplete="off">

                                                <input type="email" className=' mt-3 form-control ' placeholder='email' autoComplete="false"
                                                    value={email} onChange={(e) => { setEmail(e.target.value) }}
                                                />
                                                <input type="password" className=' mt-3 form-control ' placeholder='password' onChange={(e) => { setPassword(e.target.value) }} />

                                                {
                                                    !isLoading && (
                                                        <div className="button btn" onClick={() => hadleLogin(email, password)}>
                                                            LOGIN
                                                        </div>
                                                    )
                                                }
                                                {
                                                    isLoading && (
                                                        <div className="button btn">
                                                            <Spinner />
                                                        </div>
                                                    )
                                                }

                                            </form>
                                            <div className='mt-4 '>
                                                <small>Don't have an account?</small>
                                            </div>
                                            <div className='mt-1 '>
                                                <small>SIGN UP</small>
                                            </div>
                                        </Fade>
                                    </TabPanel>
                                    <TabPanel>
                                        <Signup />
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>

                        </center>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Login;