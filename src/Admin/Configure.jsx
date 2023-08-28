import React, { useEffect, useState } from 'react';
import Nav from '../components/nav';
import Footer from '../components/footer';
import { AttachMoney, Group, Payments, SellOutlined, StackedBarChart, WalletOutlined, } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/auth';
import Loading from '../pages/Loading';
import { useDepo, useRegistrants, useTraders, useUsers, useWithdraw } from '../hooks/useUser';
import { db } from '../config';
import { collection, onSnapshot } from 'firebase/firestore';

function Configure(props) {
    const { user, isLoading: authLoading } = useAuth()
    const { users, isLoading } = useUsers();
    const { getDeposits, deposits } = useDepo()
    const { getTraders, traders } = useTraders()
    const { getRegistrants, registrants } = useRegistrants()
    const { getWithdrawals, withdrawals } = useWithdraw()
    const [totalDeposits, setTotal] = useState("")

    useEffect(() => {
        getDeposits()
        getWithdrawals()
        getTraders()
        getRegistrants()
    }, [])

    setTimeout(() => {
        const total = () => {
            let totalDeposits = 0;
            if (!isLoading) {
                users?.map((user) => { return totalDeposits += parseInt(user.activeDeposits) })
                setTotal(totalDeposits)
            }
        }
        total()
    }, 2000);

    if (authLoading || !user?.email?.includes('admin')) return <Loading />

    return (
        <div className='app'>
            <div className='main-body'>
                <div className='steps text-white '>
                    <Nav />
                    <center>
                        <h3 className='mt-2'>ADMIN DASHBOARD</h3>
                        <div className="line"></div>
                    </center>
                    <Link to='/all-users'>
                        <div className="categories text-white mx-2 my-4">
                            <div className="">
                                <div className='earnings'><span>Signed up users</span></div>
                                <div className="p-2 withdrawable  mt-2">
                                    <div className='icon-con'>
                                        <div><Group fontSize='inherit' /></div>
                                    </div>
                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    <div>
                                        <h4>{users ? users.length : (<i>calculating...</i>)}</h4>
                                        {/* {
                                        user?.activeDeposits || user?.earnings == 0 ? <h4>USD {user.activeDeposits}.00</h4> : <div><i>Calculating...</i></div>}
                                    < small > Locked</small> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to='/registrants'>
                        <div className="categories text-white mx-2 my-4">
                            <div className="">
                                <div className='earnings'><span>Register users</span></div>
                                <div className="p-2 withdrawable  mt-2">
                                    <div className='icon-con'>
                                        <div><Group fontSize='inherit' /></div>
                                    </div>
                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    <div>
                                        <h4>{registrants ? registrants.length : (<i>calculating...</i>)}</h4>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>


                    <Link to='/approve-deposit'>
                        <div className="categories text-white mx-2 my-4">
                            <div className="">
                                <div className='earnings'><span>Pending Enrollment Deposits</span></div>
                                <div className="p-2 withdrawable  mt-2">
                                    <div className='icon-con'>
                                        <div><StackedBarChart fontSize='inherit' /></div>
                                    </div>
                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    <div>
                                        <h4>{deposits?.length}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to='/approve-withdraw'>
                        <div className="categories text-white mx-2 my-4">
                            <div className="">
                                <div className='earnings'><span>Pending Withdrawals</span></div>
                                <div className="p-2 withdrawable  mt-2">
                                    <div className='icon-con'>
                                        <div><Payments fontSize='inherit' /></div>
                                    </div>
                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    <div>
                                        <h4>{withdrawals?.length}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <div className="categories text-white mx-2 my-4">
                        <div className="">
                            <div className='earnings'><span>Total Deposits</span></div>
                            <div className="p-2 withdrawable  mt-2">
                                <div className='icon-con'>
                                    <div><AttachMoney fontSize='inherit' /></div>
                                </div>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                <div>
                                    {totalDeposits ? <h4>₦{parseInt(totalDeposits)?.toLocaleString()}</h4> : <i>Calculating...</i>}

                                    {/* {
                                        user?.activeDeposits || user?.earnings == 0 ? <h4>USD {user.activeDeposits}.00</h4> : <div><i>Calculating...</i></div>}
                                    < small > Locked</small> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>

            </div>
        </div >
    );
}

export default Configure;