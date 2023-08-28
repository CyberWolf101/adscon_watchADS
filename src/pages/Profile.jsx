import React, { useState, useEffect } from 'react';
import Nav from '../components/nav';
import Footer from '../components/footer';
import useAuth from '../hooks/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../config';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner, useToast } from '@chakra-ui/react';
import { ContentPaste, FiberManualRecord, Save, SaveAlt } from '@mui/icons-material';
import CopyToClipboard from 'react-copy-to-clipboard';
import { formatDistanceToNow } from 'date-fns';
import { differenceInDays } from 'date-fns';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function Profile(props) {
    const [currentDate, setDate] = useState(Date.now())
    const [loading, setLoading] = useState(false)

    const { user, isLoading: authLoading } = useAuth()
    const Toast = useToast()
    const [authUser, error] = useAuthState(auth);
    const nav = useNavigate()
    useEffect(() => {
        if (!authUser) {
            nav('/login')
        } else {
            console.log("usr", user)
            console.log("auth", authUser.UserImpl)
        }
        setAdress(JSON.parse(localStorage.getItem('wallet_address')))
        setDate(Date.now())
        console.log("current", currentDate)
    }, [])
    const [address, setAdress] = useState()

    function copied() {
        Toast({
            title: 'referal code copied',
            status: 'info',
            colorScheme: 'blue',
            variant: 'subtle'
        })
    }
    const saveAddress = () => {
        setAdress(localStorage.setItem('wallet_address', JSON.stringify(address)))
        Toast({
            title: 'Success',
            description: 'Account number updated!',
            status: 'info',
            colorScheme: 'blue',
            variant: 'subtle',
            position: 'top'
        })
    }

    function cashout() {
        setLoading(true)
        const docRef = doc(db, 'users', user.id)
        getDoc(docRef)
            .then((doc) => {
                const d = doc.data()
                let user_current_earnings = parseInt(d.earnings)
                updateDoc(docRef, {
                    earnings: user_current_earnings + d.enrolEarning,
                    activeDeposits: 0,
                    enrolEarning: 0,
                })
            }).then(() => {
                Toast({
                    title: 'Cashout Successful',
                    description: 'You successfully cashed out your enrollment earning!',
                    status: 'success',
                    variant: 'subtle',
                    position: 'top',
                    duration: 4000,
                    isClosable: true,
                })
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                Toast({
                    title: 'Cashout Error',
                    description: 'An error occured check your internet connection',
                    status: 'error',
                    variant: 'subtle',
                    position: 'top',
                    duration: 3000,
                    isClosable: true,

                })
            })
    }
    return (
        <div>
            <div className="app">
                <div className="main-body">
                    <Nav />
                    <div className='mx-4 user-details'>
                        <br />
                        <h5><b className='text-uppercase'>{user.name ? user.name : "user's"}</b> Account Details</h5>

                        <div className="statistics">
                            <small className='text-uppercase ms-1'>Ads erollment details</small>
                            <hr />
                            <div>
                                <small className='text-uppercase'><FiberManualRecord fontSize='inherit' /> Total deposit : <b> {user.activeDeposits ? '₦' + user.activeDeposits?.toLocaleString()  : "NILL"}</b></small>
                                <div>
                                    <small className='text-uppercase'><FiberManualRecord fontSize='inherit' /> Expected return : <b> {user.enrolEarning ? '₦' + user.enrolEarning?.toLocaleString() : "NILL"}</b></small>
                                </div>
                                {/* dont forget to  change back to >= */}
                                <div>
                                    {
                                        user?.enrol_end_time !=0 && currentDate >= user?.enrol_end_time ?
                                            (
                                                <center>
                                                    <Button
                                                        className='cashout'
                                                        onClick={cashout}
                                                        isLoading={loading}
                                                        colorScheme=''
                                                    >
                                                        cashout
                                                    </Button>
                                                </center>
                                            )
                                            :
                                            <div>
                                                {
                                                    user?.enrolEarning ?
                                                        (<small className='text-uppercase'><FiberManualRecord fontSize='inherit' /> Time remaining : <b className={user.enrol_end_time ? " " : 'text-uppercase'}> {user.enrol_end_time ? formatDistanceToNow(user.enrol_end_time) + ' left' : "NILL"}</b></small>)
                                                        :
                                                        <span></span>
                                                }
                                            </div>
                                    }

                                </div>
                                <div className='my-3'></div>
                            </div>


                        </div>
                        <label>Name:</label>
                        <input type="text" className='form-control' disabled value={user.name ? user.name : "user"} />
                        <label>Email:</label>
                        <input type="text" className='form-control' disabled value={user.email ? user.email : "user gmail..."} />
                        <label>Referal Code:</label>
                        <div className='d-flex'>
                            <input type="text" className='form-control input_button' disabled value={user.referalCode ? user.referalCode : "BT.."} style={{ height: '42px' }} />
                            <CopyToClipboard text={user?.referalCode}>
                                <button className='btn btn-light button_input' style={{ height: '42px', whiteSpace: 'nowrap' }} onClick={copied}>copy <ContentPaste fontSize='small' /></button>
                            </CopyToClipboard>
                        </div>
                        <label>Account Number:</label>
                        <div className="d-flex">
                            <input type="text"
                                className='form-control input_button'
                                // placeholder={address == "" ? "NOT SET": address}
                                value={address}
                                onChange={(e) => { setAdress(e.target.value) }}

                            />
                            <button
                                className='btn btn-light button_input'
                                disabled={address?.length < 10 || address?.length === "" || address?.length === undefined || address?.length === 0 ? true : false}
                                style={{ height: '42px', whiteSpace: 'nowrap', color: '#05102df4', }}
                                onClick={saveAddress}>save <SaveAlt fontSize='small'

                                />
                            </button>
                        </div>
                        <label>Language</label>
                        <select className='form-select' disabled>
                            <option selected>English</option>
                            <option value="">Korean</option>
                            <option value="">Chisese</option>
                        </select>
                    </div>
                </div>
                <br />
                <br />
                <Footer />
            </div>
        </div>
    );
}

export default Profile; 