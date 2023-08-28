import React, { useEffect, useState } from 'react';
import { useUsers, useWithdraw } from '../hooks/useUser';
import { Button, useToast } from '@chakra-ui/react';
import Nav from '../components/nav';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config';
import swal from 'sweetalert';

function ApproveWithdraw() {
    const { getWithdrawals, withdrawals } = useWithdraw()
    const { users, isLoading } = useUsers();
    const [pending, setPending] = useState(false)

    const toast = useToast()
    useEffect(() => {
        getWithdrawals()

    }, [])
    const approve = (data) => {
        var user_current_earnings;
        var user_current_referal_balance;
        const deleteRef = doc(db, 'Withdrawals', data.id)
        const docRef = doc(db, 'users', data.id)

        swal({
            title: "Are you sure?",
            text: "Approve this Withdrawal?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    setPending(true)
                    getDoc(docRef)
                        .then((doc) => {
                            const d = doc.data()
                            user_current_earnings = parseInt(d.earnings)
                            user_current_referal_balance = parseInt(d.referalBalance)
                            if (data.EarningsAmount === "") {
                                data.EarningsAmount = 0
                            }
                            if (data.referalAmount === '') {
                                data.referalAmount = 0
                            }
                            updateDoc(docRef, {
                                earnings: parseInt(user_current_earnings) - parseInt(data.EarningsAmount),
                                referalBalance: parseInt(user_current_referal_balance) - parseInt(data.referalAmount),
                                alerted: false,

                            })
                            deleteDoc(deleteRef)
                                .then(() => {
                                    toast({
                                        title: 'Approved',
                                        description: 'Withdrawal Approved',
                                        variant: 'subtle',
                                        status: 'success',
                                        position: 'top',
                                        isClosable: true
                                    })
                                    setPending(false)
                                })
                        })

                } else {
                    return;
                }
            }).catch((error) => {
                console.log(error)
            })

    }
    if (!withdrawals.length && !users) return <div style={{ height: '100vh', }}><center><h2>No pending deposits</h2></center></div>

    return (
        <div className='app'>
            <div className='main-body'>
                <div className='steps text-white mx-3'>
                    <Nav />
                    <div style={{ height: '100vh' }}>
                        <div>
                            {withdrawals?.map((drawal) => (
                                <div key={drawal.id} className='shadow  my-4 mx-2 container p-2 rounded'>
                                    <div className="d-flex text-black">Email:  &nbsp; <b> {drawal.email}</b></div>
                                    {drawal.EarningsAmount && <div className="d-flex text-black">Earnings request:  &nbsp;<b>${drawal.EarningsAmount}</b></div>}
                                    {drawal.referalAmount && <div className="d-flex text-black">Referal request:  &nbsp;<b>${drawal.referalAmount}</b></div>}
                                    <div className=" text-black wA">Account:  &nbsp;<small><b className='wA'>{drawal.bank_account}</b></small></div>
                                    <div className="bg-white mt-2">
                                        <Button
                                            colorScheme='green'
                                            onClick={() => approve(drawal)}
                                        // isLoading={pending}
                                        >
                                            APPROVE
                                        </Button>
                                        &nbsp;
                                        <Button
                                            colorScheme='red'
                                        // onClick={() => decline(depo)}
                                        // isLoading={pending}

                                        >
                                            DECLINE
                                        </Button>

                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApproveWithdraw;