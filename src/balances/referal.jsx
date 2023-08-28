import { Payments } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config';
import { useAuthState } from 'react-firebase-hooks/auth';
import useAuth from '../hooks/auth';
import Loading from '../pages/Loading'

function Referal(props) {
    const { user, isLoading: authLoading } = useAuth()

    const [authUser, error] = useAuthState(auth);


    if (!user) return <Loading />

    return (
        <div>
            <div className="categories text-white mx-2 my-3">
                <div className="">
                    <div className='earnings'><span>Referal Balance</span></div>
                    <div className="p-2 withdrawable  mt-2">
                        <div className='icon-con'>
                            <div><Payments fontSize='inherit' /></div>
                        </div>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <div>
                            {
                                user?.referalBalance || user?.referalBalance == 0 ? <h5>₦{parseInt(user?.referalBalance).toLocaleString()}.00</h5> : <div><i>Calculating...</i></div>
                            }
                            {
                                user?.referalBalance >= 5000 ?   < small > withdrawable</small>:   < small > Locked</small>
                            }
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Referal;