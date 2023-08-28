import React, { useEffect } from 'react';
import Nav from '../components/nav'
import { Fade } from 'react-reveal';
import { Link, useNavigate } from 'react-router-dom';
import Earnings from '../balances/earnings';
import Active from '../balances/active';
import Referal from '../balances/referal';
import { auth } from '../config';
import { useAuthState } from 'react-firebase-hooks/auth';
import useAuth from '../hooks/auth';
import { useToast } from '@chakra-ui/react';
import Footer from '../components/footer';
import Earn from '../components/earn';
import { Verified } from '@mui/icons-material';
import { Usecheck } from '../hooks/useCheck';

function Dashboard(props) {
    const { user, isLoading: authLoading } = useAuth()
    const Toast = useToast()
    // const { check } = Usecheck()


    const [authUser, error] = useAuthState(auth);
    const nav = useNavigate()
    useEffect(() => {
        if (!authUser) {
            nav('/login')
        } else {
            console.log("usr ", user)
            console.log("auth", authUser.UserImpl)
            // check()
        }
    }, [authUser])
    return (
        <div className='app '>

            <Nav />
            <div className="mx-1 text-end ">
                {
                    user.isRegistered ?
                        <div className='verified'>
                            <small><Verified fontSize='inherit' />verified</small>
                        </div>
                        :
                        <div className='not-verified'>
                            <small><Verified fontSize='inherit' />not verified</small>
                        </div>
                }


            </div>

            <div className="mx-2 mt-2">
                <Fade bottom>
                    <Earnings />

                    <Referal />

                    <Active />

                </Fade>
            </div>

            <br />

            <Earn display={'d-none'} />

            <br />
            <br />
            <br />
            <br />

        </div>
    );
}

export default Dashboard;