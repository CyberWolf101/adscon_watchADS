import { ArrowCircleRightOutlined, Groups, HandymanOutlined, MoveToInbox } from '@mui/icons-material';
import * as React from 'react';
import { Fade } from "react-reveal"
import { Link, useNavigate } from 'react-router-dom';
import CountUp from 'react-countup'
import ScrollTrigger from 'react-scroll-trigger';
import {
    Button,
    useDisclosure, useToast,
} from '@chakra-ui/react'

import swal from 'sweetalert';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import { useState } from 'react';


const Details = () => {

    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)

    const toast = useToast()
    const form = useRef();

    const nav = useNavigate()
    const [count, setCount] = React.useState(true)


    return (
        <div className=' mt-3'>

            <br />
            <br />

            <div className='mx-3 mt-2'>
                <Fade>
                    {/* <div className=" stats">
                        <center>

                            <div className="stats-con shadow stats">
                                <div className="stat">
                                    <main><Groups fontSize='inherit' className='stat-icon' /></main>
                                    {count &&
                                        <h4 className="fw-bold">
                                            <CountUp start={100} end={1438} duration={15} delay={0} />
                                        </h4>}

                                    <small className="fw-bold">Total investors</small>
                                </div>
                            </div>
                            <div className="stats-con shadow stats my-5">
                                <div className="stat">
                                    <main><MoveToInbox fontSize='inherit' /></main>
                                    <h4 className="fw-bold"><CountUp start={100} end={3957} duration={15} /></h4>
                                    <small className="fw-bold">Total Withdrawals</small>
                                </div>
                            </div>
                            <div className="stats-con shadow stats">
                                <div className="stat">
                                    <main><MoveToInbox fontSize='inherit' /></main>
                                    <h4 className="fw-bold"><CountUp start={100} end={1357} duration={15} /></h4>
                                    <small className="fw-bold">Total </small>
                                </div>
                            </div>
                           
                        </center>

                    </div> */}
                </Fade>







                {/* -----------STATS---------- */}
                <br />
                <Fade>
                    <div className="about my-3">
                        <div className='about-cover'>
                            <center>
                                <h4 className='fw-bold mt-3'>About us</h4>
                                <div>
                                    Step into a realm where possibilities are limitless, and financial freedom lies within your grasp.
                                    <br />
                                    <br />
                                     Welcome to <b>ADSCON</b>, the premier platform that revolutionizes the way you interact with advertisements while providing a unique opportunity to earn rewards. 
                                    <br />
                                    <br />
                                    Our mission is to create a mutually beneficial ecosystem where users can engage with advertisements in a meaningful way, advertisers can connect with their target audience, and everyone involved can reap the benefits.
                                    <br />
                                   
                                </div>
                            </center>
                        </div>
                    </div>
                </Fade>
                <br />
                <br />
                <center>
                    <h5 className=''>EARNING MADE EASY</h5>
                    <small className='faint'>In just 4 steps </small>
                </center>
                <div className="earn-grid">
                    <Fade left>
                        <div className='stats-con stats py-3 my-2'>
                            <div className="py-3">
                                <center>
                                    <h3>01</h3>
                                    <h6 className='fw-bold'>Create Account</h6>
                                    <small classname="faint">Register on our platform.</small>
                                </center>
                            </div>
                        </div>
                    </Fade>
                    <Fade right>
                        <div className='stats-con stats py-3 my-2'>
                            <div className="py-3">
                                <center>
                                    <h3>02</h3>
                                    <h6 className='fw-bold'>Promote</h6>
                                    <small classname="faint">Watch ads and read articles.</small>
                                </center>
                            </div>
                        </div>
                    </Fade>
                    <Fade left>
                        <div className='stats-con stats py-3 my-2'>
                            <div className="py-3">
                                <center>
                                    <h3>03</h3>
                                    <h6 className='fw-bold'>Refer</h6>
                                    <small classname="faint">Refer other users.</small>
                                </center>
                            </div>
                        </div>
                    </Fade>
                    <Fade right>
                        <div className='stats-con stats py-3 my-2'>
                            <div className="py-3">
                                <center>
                                    <h3>04</h3>
                                    <h6 className='fw-bold'>Earn</h6>
                                    <small classname="faint">Get returns conviniently.</small>
                                </center>
                            </div>
                        </div>
                    </Fade>
                </div>
            </div>
        </div>
    );
};

export default Details;