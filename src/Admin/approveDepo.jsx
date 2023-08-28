import React, { useEffect, useState } from 'react';
import Nav from '../components/nav';
import { useDepo, useUsers } from '../hooks/useUser';
import { format } from 'date-fns';
import { Button, useToast } from '@chakra-ui/react';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config';
import swal from 'sweetalert';
import { add } from 'date-fns';


function ApproveDepo(props) {
    const { getDeposits, deposits } = useDepo()
    const [pending, setPending] = useState(false)
    const { users, isLoading } = useUsers();

    const toast = useToast()
    useEffect(() => {
        getDeposits()

    }, [])

    const approve = (depo) => {
        swal({
            title: "Are you sure?",
            text: "Approve this deposit?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    setPending(true)

                    const docRef = doc(db, 'users', depo.id)
                    const deleteRef = doc(db, 'Depositors', depo.id)
                    const date = new Date()




                    const start_day = new Date(); // Replace this with the date you want to increase

                    const daysToAdd = 7;
                    const resultDate = add(start_day, { days: daysToAdd });
                    const end_day = Date.now() + 7 * 24 * 60 * 60 * 1000
                    const full_end_day = resultDate;
                    var user_current_deposit
                    getDoc(docRef)
                        .then((doc) => {
                            const d = doc.data() //we didn't have to loop cus we are getting 1 doc
                            user_current_deposit = parseInt(d.activeDeposits)
                            updateDoc(docRef, {
                                activeDeposits: user_current_deposit + depo.deposit,
                                enrolEarning: depo.deposit * 1.5,
                                enrol_end_time: end_day,
                                enrol_start_time: start_day,
                                full_end_date: full_end_day,
                                alerted: false,
                            })


                            deleteDoc(deleteRef)
                                .then(() => {
                                    toast({
                                        title: 'Approved',
                                        description: 'Payment Approved',
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
            });

    }

    function decline(depo) {
        swal({
            title: "Are you sure?",
            text: "Decline this deposit?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    setPending(true)
                    const deleteRef = doc(db, 'Depositors', depo.id)
                    deleteDoc(deleteRef)
                    toast({
                        title: 'Declined',
                        description: 'Payment Declined!',
                        variant: 'subtle',
                        status: 'error',
                        position: 'top',
                        isClosable: true

                    })
                } else {
                    setPending(false)
                    return;
                }
            })


    }


    if (!deposits.length && !users) return <div style={{ height: '100vh', }}><center><h2>No pending deposits</h2></center></div>
    return (
        <div className='app'>
            <div className='main-body'>
                <div className='steps text-white mx-3'>
                    <Nav />
                    <div style={{ height: '100vh' }}>
                        <div>
                            {deposits?.map((depo) => (
                                <div key={depo.id} className='shadow  my-4 mx-2 container p-2 rounded'>
                                    <div className="d-flex text-black">Email:  &nbsp; <b> {depo.email}</b></div>
                                    <div className="d-flex text-black">Deposit:  &nbsp;<b>{depo.deposit}</b></div>
                                    <div className="d-flex text-black">Accountname:  &nbsp; <b> {depo.accountName}</b></div>
                                    <div className="d-flex text-black">Current balance:  &nbsp; <b> {depo.activeDeposits}</b></div>
                                    <div className="d-flex text-black">Bank:  &nbsp; <b> {depo.bank}</b></div>
                                    {/* <div className="d-flex">Date: <b>{format(depo?.created_at.Timestamp.seconds, "MMM YYY")}</b></div> */}
                                    <div className="bg-white mt-2">
                                        <Button
                                            colorScheme='green'
                                            onClick={() => approve(depo)}
                                            isLoading={pending}
                                        >
                                            Approve
                                        </Button>
                                        &nbsp;
                                        <Button
                                            colorScheme='red'
                                            onClick={() => decline(depo)}
                                            isLoading={pending}

                                        >
                                            Decline
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

export default ApproveDepo;