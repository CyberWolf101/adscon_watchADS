import { LockClock } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config';
import { useAuthState } from 'react-firebase-hooks/auth';
import useAuth from '../hooks/auth';

function Active(props) {
    const { user, isLoading: authLoading } = useAuth()

    const [authUser, error] = useAuthState(auth);
    const nav = useNavigate()
    useEffect(() => {

    }, [])
    return (
        <div>
            <div className="categories text-white mx-2 ">
                <div className="">
                    <div className='earnings'><span>Enrollment Deposits</span></div>
                    <div className="p-2 withdrawable  mt-2">
                        <div className='icon-con'>
                            <div><LockClock fontSize='inherit' /></div>
                        </div>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <div>
                            {
                                user?.activeDeposits || user?.activeDeposits == 0 ?<h5>₦ {parseInt(user.activeDeposits).toLocaleString()}.00</h5> : <div><i>Calculating...</i></div> }
                            < small > Locked</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Active;