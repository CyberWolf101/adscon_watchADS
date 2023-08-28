import React, { useEffect, useState } from 'react';
import Nav from '../components/nav';
import { useDepo, useRegistrants, useUsers } from '../hooks/useUser';
import { format } from 'date-fns';
import { Button, useToast } from '@chakra-ui/react';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config';
import swal from 'sweetalert';
import useAuth from '../hooks/auth';
import Loading from '../pages/Loading';

export default function ApproveRegistration(props) {
    const { getRegistrants, registrants } = useRegistrants()
    const [pending, setPending] = useState(false)
    const { users, isLoading } = useUsers();
    const { user, isLoading: authLoading } = useAuth()

    const toast = useToast()
    useEffect(() => {
        getRegistrants()

    }, [])

    const approve = (depo) => {
        swal({
            title: "Are you sure?",
            text: "Approve this registration?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    setPending(true)
                    let refered
                    let referalRef
                    if (depo.referer === '' || depo.referer < 17 || !depo.referer) {
                        console.log("pass")
                        refered = depo
                    } else {
                        refered = users.find((user) => {
                            return user?.referalCode === depo?.referer
                        })
                    }

                    referalRef = doc(db, 'users', refered.id)
                    const docRef = doc(db, 'users', depo.id)
                    const deleteRef = doc(db, 'Registrants', depo.id)
                    var user_current_deposit
                    var current_referal_balance
                    getDoc(docRef)
                        .then((doc) => {
                            const d = doc.data() //we didn't have to loop cus we are getting 1 doc
                            user_current_deposit = parseInt(d.activeDeposits)
                            updateDoc(docRef, {
                                isRegistered: true,
                                userReferer: ''
                            })
                            if (refered == depo) {
                                console.log("pass")
                            } else {
                                getDoc(referalRef)
                                    .then((doc) => {
                                        const d = doc.data()
                                        current_referal_balance = parseInt(d.referalBalance)
                                        updateDoc(referalRef, {
                                            referalBalance: current_referal_balance + 250,


                                        })
                                    })

                            }

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
                    const deleteRef = doc(db, 'Registrants', depo.id)
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

    if (authLoading || !user?.email?.includes('admin')) return <Loading />
    return (
        <div className='app'>
            <div className='main-body'>
                <div className='steps text-white mx-4 ms-0 '>
                    <Nav />
                    <div style={{ height: '100vh' }}>
                        <div>
                            {registrants?.map((reg) => (
                                <div key={reg.id} className='shadow  my-4 mx-2 container p-2 rounded'>
                                    <div className="d-flex text-black">Email:  &nbsp; <b> {reg.email}</b></div>
                                    <div className="d-flex text-black">Accountname:  &nbsp; <b> {reg.accountName}</b></div>
                                    <div className="d-flex text-black">Bank:  &nbsp; <b> {reg.bank}</b></div>
                                    {/* <div className="d-flex">Date: <b>{format(depo?.created_at.Timestamp.seconds, "MMM YYY")}</b></div> */}
                                    <div className="bg-white mt-2">
                                        <Button
                                            colorScheme='green'
                                            onClick={() => approve(reg)}
                                            isLoading={pending}
                                        >
                                            Approve
                                        </Button>
                                        &nbsp;
                                        <Button
                                            colorScheme='red'
                                            onClick={() => decline(reg)}
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
