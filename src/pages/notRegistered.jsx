import React, { useEffect } from 'react';
import Nav from '../components/nav';
import { ArrowCircleRight } from '@mui/icons-material';
import { useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import useAuth from '../hooks/auth';

function NotRegistered(props) {
    const { user, isLoading: authLoading } = useAuth()

    const Toast = useToast()

    useEffect(() => {
        Toast({
            title: 'AN ERROR OCCURED',
            description: 'please make sure you are registered.',
            status: 'error',
            variant: 'subtle',
            duration: 5000,
            isClosable: true,

        })

    }, [])
    if (!user) return <Loading />
    return (
        <div>
            <Nav />

            <div className='d-flex' style={{ height: '70vh', alignItems: 'center', justifyContent: 'center' }}>

                <div>
                    <center>

                        <img src="https://th.bing.com/th/id/OIP.yxyGsSN4ATqgh_u83cbU1QHaHa?w=167&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="" />
                        <h5>Oops, looks like you're not registered</h5>
                        <Link to='/register' className='btn myBtn'>Register Now <ArrowCircleRight /></Link>

                    </center>
                </div>
            </div>
        </div>
    );
}

export default NotRegistered;