import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config';
import bg from '../assets/Hero_edited.jpg'
import Typewriter from 'typewriter-effect';
import Badge from '../assets/badgeSvg'
import Details from './details';
import Features from './features';
import { Fade } from 'react-reveal';

// ADSCON ENTERPRISES
function Intro(props) {
    const nav = useNavigate()
    const [b] = useState("ADSCON")

    const [authUser, error] = useAuthState(auth);

    return (
        <div className='text-black'>
            <div className='mt-4 mb-5 '>
                <div className='mt-3 ' style={{ padding: "0px 8px" }}>
                    <h5 style={{ fontSize: '16px' }}>
                        <Typewriter
                            options={{
                                autoStart: true,

                            }}

                            onInit={(typewriter) => {

                                typewriter
                                    .typeString("Monetize your spare moments.")
                                    .start();
                            }}
                        />

                    </h5>
                    <button className='btn myBtn py-2' onClick={() => nav('/login')}>Get Started</button>

                </div>
                <div style={{ float: 'right', textAlign: 'right' }}>
                    <div className='intro-img me-2'>
                        <div className='intro-img-div'>
                            <img src={bg} alt="..." className='img-fluid mt-5' />
                        </div>
                        <div className='absolute-contents-div'>
                            <Fade left duration={1100}>
                                <div className='absolute-contents'>
                                    <div className='doings'><Badge /> &nbsp; <b>Refer</b></div>
                                    <div></div><div className="doings-det">Refer and earn for every user that signs up with your referal code.</div>
                                </div>
                            </Fade>
                            <Fade left duration={1500}>
                            <div className='absolute-contents'>
                                <div className='doings'><Badge /> &nbsp; <b>Promote</b></div>
                                <div></div><div className="doings-det">Promote us by watching ads and reading articles.</div>
                            </div>
                            </Fade>
                            <Fade left duration={1900}>
                            <div className='absolute-contents'>
                                <div className='doings'><Badge /> &nbsp; <b>Earn</b></div>
                                <div></div><div className="doings-det">Posibilities are limitsless once you engage with your terms.</div>
                            </div>
                            </Fade>
                            
                          
                        </div>
                        <div className="me-2">
                            <small >Discover the Value of Attention and Monetize Your spare Moments. </small>
                        </div>
                    </div>
                </div>



            </div>

            <Features />

            {/* ---OTHER--- */}
            <Details />
        </div>
    );
}

export default Intro;