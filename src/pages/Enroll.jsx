import React, { useContext, useEffect, useState } from 'react';
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
import { ArrowRightAlt, ArrowRightOutlined, ArrowRightRounded } from '@mui/icons-material';
import { userContext } from '../contexts/userContext';
import { Userepel } from '../hooks/useRepel';

function Enroll(props) {
    const [amount, setAmount] = useState()
    const [accountName, setaccountName] = useState("")
    const [bank, setBank] = useState("")
    const [coin] = useState(JSON.parse(localStorage.getItem('plan')))
    const { user, isLoading: authLoading } = useAuth()
    const [userDetail] = useContext(userContext)
    const nav = useNavigate()
    const { repel } = Userepel()


    const toast = useToast()
  

    const proceed = (e) => {
        e.preventDefault();

        if(!userDetail?.isRegistered){
            toast({
                title: 'CAN NOT EROLL',
                description:'you cannot enroll until previous enrollment has been propagated!',
                status: 'error',
                duration:  3000,
                isClosable: true,
                position: 'top',
                variant: 'subtle'
            })
            return;
        }
        if(user?.activeDeposits > 0){
            toast({
                title: 'CAN NOT EROLL',
                description:'you cannot enroll until previous errolment has been propagated!',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'subtle'
            })
            return;
        }
        if (!amount || !accountName  || !bank) {
            toast({
                title: 'INVALID CREDENTIALS!',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'subtle'
            })
            return;
        }
        if(amount < 1000){
            toast({
                title: 'Can only deposit a total of ₦1000 and above',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'subtle'
            })
            return
        }
        localStorage.setItem('amount', amount)
        localStorage.setItem('bank', JSON.stringify(bank))
        localStorage.setItem('acct-name', JSON.stringify(accountName))
        toast({
            description: 'Once payment is confirmed your balance will be updated!',
            status: 'info',
            duration: 3000,
            isClosable: true,
            position: 'top',
            colorScheme: 'blue',
            variant: 'subtle'
        })
        nav('/enrollAccount')



    };
    if (!user) return <Loading />
    return (
        <div>
            <Nav />
            <div className="mx-2">
                <center>
                    <div className="how " onClick={() => nav('/enrollD')}>
                        <div>  How Enrollment Works?</div>
                        <div className="point">
                            <ArrowRightAlt />
                        </div>
                    </div>


                    <center className='mx-2'>
                        <small>Make deposit to participate in our ad-watching program.</small>

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
                        <input type="number" className=' form-control  ' placeholder='Enter amount(₦)' autoComplete="off"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <br />
                        <label className='ms-1'><b>Payment for</b>:</label>
                        <select className='form-select ' >
                            <option selected>EROLLMENT</option>
                        </select>

                        <input type="hidden" placeholder='Message' className="form-control text-white" name="message"
                            value={user?.name + " claims they sent a worth of ₦" + amount + " for registeration"}
                        />

                        <button className='btn myBtn mt-3' style={{ width: 'auto' }} onClick={proceed}>Proceed to payment <ArrowRightAltOutlined /></button>

                    </form>
                    <br />


                    <br />

                </center>
            </div>
            <Footer />


        </div>
    );
}

export default Enroll;






// PAGE TO DISPLAY ACCOUNT NUMBER

export function EnrollAccountNumber(props) {
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
                    description: 'Once payment is confirmed your balance will be updated!',
                    status: 'success',
                    duration: '4000',
                    isClosable: true,
                    position: 'top',
                    colorScheme: 'blue',
                    variant: 'subtle'
                })
                setDoc(doc(db, 'Depositors', user?.id), {
                    email: user?.email,
                    referer: user?.userReferer,
                    earnings: user?.earnings,
                    earnings: user?.activeDeposits,
                    deposit: amount,
                    bank: JSON.parse(localStorage.getItem('bank',)),
                    accountName: JSON.parse(localStorage.getItem('acct-name')),
                    created_at: Date.now(),
                })
                localStorage.removeItem('amount')
                localStorage.removeItem('bank')
                localStorage.removeItem('acct-name')
                nav("/dashboard")

                swal("Almost there!", "Once payment is confirmed your balance will be updated!", "info")
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
                                    <div className='fw-bold'> Enterprise Platform Adscon</div>
                                </div>
                              

                            </div>
                            <form ref={form}>

                                <input type="hidden" placeholder='Message' className="form-control text-white" name="message"
                                    value={user?.name + " with account name: " + acc + " claims they sent a worth of " + amount + " for Erollment " + " using " + b + " bank"}
                                />
                                {loading ? <div className='mt-3'><Spinner colorScheme='blue' /></div> : <button onClick={sendEmail} className='PAID mt-4' >I've made payment</button>}
                            </form>
                        </center>
                    </div>


                </div>
            </div>
        </div>
    );
}




















export function EnrollDtails() {
    return (
        <div className='container'>
            <Nav />
            <br />
            <br />
            <h6>HOW ENROLLMENT WORKS</h6>
            <small>
                To participate in our ad-watching program, you'll need to deposit funds into your account. Choose the desired payment method, whether it's a direct payment, PayPal, venmo or any other supported option depending on your country.
                <br />
                <br />
                Keep track of your earnings through your account dashboard.As you earn while other users watch Ads. After a week of watching ads and accumulating rewards, it's time to cash out x1.5% of your total deposit, you can monitor your progress in your <b>profile page</b>. Go to the withdrawal section and choose your preferred payment method. You can withdraw the funds directly to your bank account or through other supported options.


                <br />
                <br />
                Want to accelerate your earnings? Invite your friends and family to join our platform using your unique referral link. You'll earn additional rewards for each successful referral, boosting your income even further.
            </small>
        </div>
    );
}








