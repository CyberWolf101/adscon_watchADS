import React, { useRef, useState } from 'react';
import Earnings from '../balances/earnings';
import Referal from '../balances/referal';
import Nav from '../components/nav';
import Footer from '../components/footer';
import swal from 'sweetalert';
import useAuth from '../hooks/auth';
import { auth } from '../config';
import Loading from './Loading';
import { useAuthState } from 'react-firebase-hooks/auth';
import emailjs from '@emailjs/browser';
import { db } from '../config';
import { Spinner, useToast } from '@chakra-ui/react';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Withdraw() {
    const { user, isLoading: authLoading } = useAuth()
    const [authUser, error] = useAuthState(auth);
    const [selectedOption, setSelectedOption] = useState('');
    const [Amount, setAmount] = useState("");
    const [bank, setBank] = useState("");
    const [Referalmount, setReferalmount] = useState("");
    const [Address, setAddress] = useState("");
    const [rb, setrb] = useState(true);
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const nav = useNavigate()



    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        if (selectedOption === 'Referal') {
            setrb(true)
        } else {
            setrb(false)
        }
    };
    const AmountChange = (event) => {
        setAmount(event.target.value);
        setReferalmount('')
        if (Amount > parseInt(user.earnings)) {
            alert("Cannot exceed total earnings!")
            setAmount(parseInt(user.earnings))
        }
    };
    const ReferalmountChange = (event) => {
        setReferalmount(event.target.value);
        setAmount('')
        if (Referalmount > parseInt(user.referalBalance)) {
            alert("Cannot exceed total earnings!")
            setReferalmount(parseInt(user.referalBalance))
        }
    };

    const form = useRef();
    const withdrawal = (e) => {
        e.preventDefault()
        if (!Referalmount && !Amount ) {
            toast({
                title: 'Error',
                description: 'Invalid Inputs!',
                status: 'error',
                duration: '3000',
                isClosable: true,
                position: 'top',
                variant: 'subtle'
            })
            return;
        } else if (!Address || !bank) {
            toast({
                title: 'Invalid inputs',
                description: 'Make sure you fill are required details.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'subtle'
            })
            return;
        } else if(parseInt(user.earnings) < 1000){
            toast({
                title: 'Error',
                description: 'Your total earnings must be atleast ₦1000 before you can withdraw',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'subtle'
            })
            return;
        }
        else if (Amount > parseInt(user.earnings) || Referalmount > parseInt(user.referalBalance)) {
            toast({
                title: 'Error',
                description: 'You cannot withdraw an amount greater than your total balanace',
                status: 'error',
                duration: 6000,
                isClosable: true,
                position: 'top',
                variant: 'subtle'
            })
            return;
        }

        setLoading(true)
        emailjs.sendForm('service_zoajps5', 'template_onzxai9', form.current, '-yejgZ1qhJmKWAZOo')
            //1 SERVICE ID   
            //2 TEMPLATE_ID
            //3 PUBLIC KEY 
            .then((result) => {
                console.log(result.text);

                setDoc(doc(db, 'Withdrawals', user?.id), {
                    email: user?.email,
                    earnings: user?.earnings,
                    EarningsAmount: Amount,
                    referalAmount: Referalmount,
                    bank_account: Address,
                    created_at: Date.now(),
                })

                toast({
                    title: 'Success',
                    description: 'Your request is being processed',
                    status: 'success',
                    duration: '5000',
                    isClosable: true,
                    position: 'top',
                    colorScheme: 'blue',
                    variant: 'subtle'
                })
                nav('/dashboard')
                setLoading(false)
            }, (error) => {
                console.log(error.text);
                setLoading(false)
                swal("", "An error occured", "info")
            });
    }



    if (!user) return <Loading />
    return (
        <div className="app">
            <div className="main-body">
                <Nav />
                <div className='withdrawables '>
                    <br />

                    <Earnings />
                    <br />
                    <Referal />

                    <br />
                    <div className='mx-4 mt-3'>
                        <form ref={form}>
                            <label>Withdraw from:</label>
                            <select className='form-select' value={selectedOption} onChange={handleSelectChange}>
                                <option value="Earnings" disabled={user?.earnings < 5000}>Earnings</option>
                                <option value="Referal" disabled={user?.referalBalance < 5000}>Referal Balance</option>
                            </select >
                            <br />
                            <label>Enter Amount:</label>
                            <input type={rb ? "number" : "hidden"} className='form-control' placeholder="Earnings" value={Amount} disabled={user?.earnings < 5000} onChange={AmountChange} />
                            <input type={!rb ? "number" : "hidden"} className='form-control' placeholder="referal balance" disabled={user?.referalBalance < 5000} value={Referalmount} onChange={ReferalmountChange} />
                            <br />
                            <label>Account Number</label>
                            <input type="text" className='form-control' value={Address} placeholder='Account number' onChange={(e) => { setAddress(e.target.value) }} />
                            <br />
                            <label>Bank Name:</label>
                            <input type="text" className='form-control' value={bank} placeholder='Bank name' onChange={(e) => { setBank(e.target.value) }} />
                            <br />
                            <label>Payment method:</label>
                            <select className='form-select'>
                                <option selected>select payment method</option>
                                <option >Bank Transfer</option>
                            </select>
                            <input type="hidden" name="message" value={user?.name + " is requesting " + selectedOption + " withdrawal of " + Amount + " " + Referalmount + " to bank account: " + Address +" " + bank} />
                            {
                                loading ? <div className='mt-4'><Spinner thickness='5px' /></div> : (<button className='myBtn btn mt-4' onClick={withdrawal}>Request withdrawal</button>)
                            }
                        </form>
                    </div>
                    <br />
                    <br />
                    <br />

                </div>
                <Footer />
                <br />
            </div>
        </div >
    );
}

export default Withdraw;