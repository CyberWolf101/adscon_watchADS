import React from 'react';
import { AccountCircle, Chat, CloseOutlined, CurrencyBitcoin, CurrencyExchange, CurrencyYen, Dashboard, Engineering, Home, HowToReg, Login, Logout, Menu, PaymentSharp, StackedBarChartSharp } from '@mui/icons-material';
import { Fade } from 'react-reveal';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/logout';
import useAuth from '../hooks/auth';
import { Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useState } from 'react';
import { auth } from '../config';
import { useAuthState } from 'react-firebase-hooks/auth';

function Nav({ display }) {
    const { logout, isLoading } = useLogout()
    const [isAdmin, setAdmin] = useState(false)
    const nav = useNavigate()
    const { user, isLoading: pending } = useAuth()
    const [authUser, error] = useAuthState(auth);

    // useEffect(()=>{
    //     if(user?.email)
    // })
    const styles = {
        logo: {
            letterSpacing: '3px',
            fontSize: '23px',
            textTransform: 'uppercase'
        }
    }
    return (
        <div className={display}>
            <Fade top duration={1500}>
                <div className='main-nav' >
                    <Link to="/">
                        <div className='d-flex' >
                            <h2 className='TILT' style={styles.logo}>adscon</h2>
                        </div></Link>

                    <div className="text-black btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                        <Menu fontSize='large' />
                    </div>
                </div>
            </Fade>

            <div className="offcanvas offcanvas-start offNav" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{ width: '70%' }}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel"></h5>
                    <button type="button" className="btn" data-bs-dismiss="offcanvas" aria-label="Close" style={{ color: 'black' }}><CloseOutlined /></button>
                </div>
                <div className="offcanvas-body">
                    <div className='nav-contents'>
                        <Link to="/">
                            <div>
                                <div className='nav-links'><Home /> &nbsp;Home </div>
                            </div>
                        </Link>
                        <Link to="/dashboard">
                            <div>
                                <div className='nav-links'><Dashboard /> &nbsp;Dashboard </div>
                            </div>
                        </Link>
                        <Link to="/earn" >
                            <div className='nav-links'><StackedBarChartSharp />&nbsp; Earn </div>
                        </Link>
                        <Link to="/withdraw">
                            <div>
                                <div className='nav-links'><PaymentSharp /> &nbsp;Withdraw </div>
                            </div>
                        </Link>

                        <Link to="/profile">
                            <div className='nav-links'><AccountCircle /> &nbsp;Profile </div>
                        </Link>
                        <Link to="/register">
                            <div className='nav-links'><HowToReg /> &nbsp;Register </div>
                        </Link>
                        <a href="javascript:void(Tawk_API.toggle())" className=''>
                                <div className='nav-links'><Chat /> &nbsp;Get Help </div>
                        </a>

                        {user?.isAdmin ? (
                            <div>
                                <Link to="/protected/configure">
                                    <div className='nav-links'><Engineering />&nbsp; Configure </div>
                                </Link>
                            </div>
                        )
                            :
                            <span></span>
                        }

                        {/* <Link to="/loading">
                            <div className='nav-links'><Home /> Testimonial </div>

                        </Link> */}


                        <div className='mt-5'>
                            {
                                authUser && (
                                    <Button
                                        colorScheme="blackAlpha"
                                        size="sm"
                                        onClick={logout}
                                        isLoading={isLoading}
                                        rightIcon={<Logout />}
                                    >
                                        Logout
                                    </Button>
                                )
                            }

                            {
                                !authUser && (
                                    <Button
                                        colorScheme="blackAlpha"
                                        size="sm"
                                        onClick={() => nav('/login')}
                                        isLoading={isLoading}
                                        rightIcon={<Login />}
                                    >
                                        Login
                                    </Button>
                                )
                            }

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Nav;