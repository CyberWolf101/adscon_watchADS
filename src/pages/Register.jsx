import React, { useEffect, useState } from 'react';
import Nav from '../components/nav';
import Footer from '../components/footer';
import { ArrowRight, ArrowRightAltOutlined, ContentPaste, Lock } from '@mui/icons-material';
import { Spinner, Toast, useToast } from '@chakra-ui/react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import swal from 'sweetalert';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import useAuth from '../hooks/auth';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';
import { db } from '../config';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';


export default function Register(props) {
    const [amount, setAmount] = useState("1000")
    const [accountName, setaccountName] = useState("")
    const [bank, setBank] = useState("")
    const [coin] = useState(JSON.parse(localStorage.getItem('plan')))
    const { user, isLoading: authLoading } = useAuth()
    const nav = useNavigate()


    const toast = useToast()

    const proceed = (e) => {
        e.preventDefault();
        if (!bank || !accountName) {
            toast({
                title: 'INVALID CREDENTIALS!',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
                colorScheme: 'blue',
                variant: 'subtle'
            })
            return;
        }
        localStorage.setItem('amount', amount)
        localStorage.setItem('bank', JSON.stringify(bank))
        localStorage.setItem('acct-name', JSON.stringify(accountName))
        toast({
            description: 'Once payment is confirmed your account will be verified!',
            status: 'info',
            duration: 3000,
            isClosable: true,
            position: 'top',
            colorScheme: 'blue',
            variant: 'subtle'
        })
        nav('/payment')



    };
    if (!user) return <Loading />

    return (
        <div>

            <Nav />
            <br />
            <center className='mx-2'>
                <h4 className="text-center">REGISTER</h4>
                <small>Registered users are verified users and can have access to all adscon features</small>

            </center>
            <form autoComplete="false" className='mx-4 mt-5'>
                <label className='ms-1'><b>Account name</b>:</label>
                <input type="text" className=' form-control  ' placeholder='User account name' autoComplete="off"
                    value={accountName}
                    onChange={(e) => setaccountName(e.target.value)}
                />
                <br />
                <label className='ms-1'><b>Bank</b>:</label>
                <input type="text" className=' form-control  ' placeholder="User bank" autoComplete="off"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                />
                <br />
                <label className='ms-1'><b>Amount</b>:</label>
                <input type="text" className=' form-control  ' placeholder='Enter amount(₦)' autoComplete="off"
                    value="₦1000"
                />
                <br />
                <label className='ms-1'><b>Payment for</b>:</label>
                <select className='form-select ' >
                    <option selected>USER REGISTERATION</option>
                </select>

                <input type="hidden" placeholder='Message' className="form-control text-white" name="message"
                    value={user?.name + " claims they sent a worth of ₦" + amount + " for registeration"}
                />

                <button className='btn myBtn mt-3' style={{ width: 'auto' }} onClick={proceed}>Proceed to payment <ArrowRightAltOutlined /></button>

            </form>
            <br />


            <br />
            <br />
            <br />
            <Footer />
        </div >
    );
}






// PAGE TO DISPLAY ACCOUNT NUMBER

export function AccountNumber(props) {
    const [amount, setAmount] = useState(JSON.parse(localStorage.getItem('amount')))
    const [b] = useState(JSON.parse(localStorage.getItem('bank')))
    const [acc] = useState(JSON.parse(localStorage.getItem('acct-name')))
    const [value, setValue] = useState(6340023854)
    const [coin] = useState(JSON.parse(localStorage.getItem('plan')))
    const [feedback, setFeedback] = useState('')
    const [loading, setLoading] = useState(false)
    const nav = useNavigate()
    const { user, isLoading: authLoading } = useAuth()


    const Toast = useToast()
    const copied = () => {
        Toast({
            title: 'Account number copied',
            isClosable: true,
            duration: 2000,
            variant: 'subtle',
            position: 'top'

        })
    }

    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault()
        setLoading(true)
        emailjs.sendForm('service_zoajps5', 'template_onzxai9', form.current, '-yejgZ1qhJmKWAZOo')
            //1 SERVICE ID   
            //2 TEMPLATE_ID
            //3 PUBLIC KEY 
            .then((result) => {
                console.log(result.text);

                Toast({
                    description: 'Once payment is confirmed your account will be updated!',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position: 'top',
                    colorScheme: 'blue',
                    variant: 'subtle'
                })
                setDoc(doc(db, 'Registrants', user?.id), {
                    email: user?.email,
                    referer: user?.userReferer,
                    earnings: user?.earnings,
                    deposit: amount,
                    bank: JSON.parse(localStorage.getItem('bank',)),
                    accountName: JSON.parse(localStorage.getItem('acct-name')),
                    created_at: Date.now(),
                })
                localStorage.removeItem('amount')
                localStorage.removeItem('bank')
                localStorage.removeItem('acct-name')
                nav("/dashboard")

                swal("Almost there!", "Once payment is confirmed your account will be updated!", "info")
                setLoading(false)
            }, (error) => {
                console.log(error.text);
                setLoading(false)
                swal("", "An error occured", "info")
            });
    }




    return (
        <div className='app'>
            <Nav />
            <div className='' style={{ height: '100vh' }}>
                <div className="" style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className='account-details '>
                        <center>
                            <div className=''>
                                <h5>ACCOUNT DETAILS</h5>
                                <div className='d-flex justify-content-center align-center ' style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <div className='address-div'>
                                        <div>Bank name:</div>
                                        <div className='fw-bold'> Moniepoint</div>
                                    </div>
                                    <br />
                                    <div className='address-div'>
                                        <div>Account number:</div>
                                        <div className='fw-bold'> {value}</div>
                                    </div>
                                    <CopyToClipboard text={value}>
                                        <button className='btn myBtn mt-1' onClick={copied}>copy <ContentPaste /></button>
                                    </CopyToClipboard>
                                </div>
                                <br />
                                <div>
                                    <div>Account name:</div>
                                    <div className='fw-bold'> Enterprise platform Adscon</div>
                                </div>
                                <br />
                                <div>
                                    <div>Total Amount:</div>
                                    <div className='fw-bold'> ₦1000</div>
                                </div>

                            </div>
                            <form ref={form}>

                                <input type="hidden" placeholder='Message' className="form-control text-white" name="message"
                                    value={user?.name + " with account name: " + acc + " claims they sent a worth of " + amount + " for registration " + " using " + b + " bank"}
                                />
                                {loading ? <div className='mt-3'><Spinner colorScheme='blue' /></div> : <button onClick={sendEmail} className='PAID py-2 px-3 mt-4' >I've made payment</button>}
                            </form>
                        </center>
                    </div>


                </div>
            </div>
        </div>
    );
}

