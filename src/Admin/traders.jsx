import { collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../config';
import Nav from '../components/nav';
import { useTraders } from '../hooks/useUser';
import { Button, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { isAfter, subHours } from 'date-fns';
import swal from 'sweetalert';

function Traders(props) {
    const [pending, setPending] = useState(false)
    const toast = useToast()

    async function approve(trade) {
        swal({
            title: "Are you sure?",
            text: "Approve this Trade?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {

                setPending(true)

                const docRef = doc(db, 'users', trade.id)
                const deleteRef = doc(db, 'traders', trade.id)
                getDoc(docRef)
                    .then((doc) => {
                        const d = doc.data()
                        updateDoc(docRef, {
                            earnings: parseInt(trade.Totalearned) + parseInt(d.earnings),
                            trade_updated : true,
                            alerted: false,
                        })
                        console.log(trade.Totalearned + d.earnings)

                        deleteDoc(deleteRef)
                            .then(() => {
                                toast({
                                    title: 'Approved',
                                    description: 'Trade Approved',
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

    async function decline() {

    }

    const { getTraders, traders } = useTraders()
    useEffect(() => {
        getTraders()

    }, [])


    return (
        <div className='app'>
            <div className='main-body'>
                <Nav />

                <div className='steps text-white mx-3'>
                    <div style={{ height: '100vh' }}>
                        {traders?.map((trade) => (
                            <div key={trade.id} className='bg-white  my-3 mx-2 container p-2 rounded'>
                                <div className="d-flex text-black">Email:  &nbsp; <b> {trade.email}</b></div>
                                <div className="d-flex text-black">Earend:  &nbsp;<b>${trade.Totalearned} </b></div>
                                <div className="d-flex text-black">Deposited:  &nbsp;<b>${trade.tradedAmount} </b></div>
                                <div className="d-flex text-black">Created:  &nbsp;<b>{formatDistanceToNow(trade.created_at)} ago </b></div>
                                {/* <div className="d-flex">Date: <b>{format(depo?.created_at.Timestamp.seconds, "MMM YYY")}</b></div> */}
                                <div className="bg-white mt-2">
                                    <Button
                                        colorScheme='green'
                                        onClick={() => approve(trade)}
                                        isLoading={pending}
                                    >
                                        Approve
                                    </Button>
                                    &nbsp;
                                    <Button
                                        colorScheme='red'
                                        onClick={() => decline(trade)}
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
    );
}
export default Traders;