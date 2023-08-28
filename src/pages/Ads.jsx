import React, { useEffect, useRef, useState } from 'react';
import vid from '../assets/vid.mp4'
import { Spinner, useToast } from '@chakra-ui/react';
import Nav from '../components/nav';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { db, storage } from '../config';
import { getStorage, ref as storageRef } from 'firebase/storage';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { Forward, Pause, PlayArrow } from '@mui/icons-material';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import useAuth from '../hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-reveal';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import { animateTopScroll } from 'react-scroll/modules/mixins/animate-scroll';
import Loading from './Loading';

function Ads() {
    const toast = useToast()
    const [showPause, setPause] = useState(true)
    const [showAd, setShowAd] = useState(false)
    const { user, isLoading: authLoading } = useAuth()
    const nav = useNavigate()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })


    }, [user])
    const vidRef = useRef(null)


    const handlePlay = () => {
        // vidRef.current.play()
        setPause(true)

    }
    const handlePause = () => {
        // vidRef.current.pause()
        setPause(false)
    }



    const [value, loading, error] = useDownloadURL(storageRef(storage, `Ads/4.mp4`));
    const handleVideoEnd = () => {
        const docRef = doc(db, 'users', user.id)
        var user_current_earnings
        let date = new Date()
        getDoc(docRef)
            .then((doc) => {
                const d = doc.data()
                user_current_earnings = parseInt(d.earnings)
                updateDoc(docRef, {
                    earnings: user_current_earnings + 50,
                    watchedAd: true,
                    ADday: date.getDate(),
                    ADmonth: date.getMonth()
                })
            }).then(() => {
                console.log("State value increased:")
                nav("/dashboard")
                toast({
                    title: 'REWARD GRANTED',
                    description: 'Your balance has been updated!',
                    status: 'success',
                    position: 'top',
                    variant: 'subtle',
                    duration: 5000,
                    isClosable: true
                })
            })

    };


    const check = () => {
        if (user.watchedAd) {
            let date = new Date()
            let today = date.getDate()
            if (today > user.ADday || date.getMonth() > user.ADmonth) {
                setShowAd(true)
                // handlePlay()
            } else {
                toast({
                    title: 'Limit exceeded',
                    description: 'You have watched ads the maximum number of times today, check back tomorrow',
                    status: 'error',
                    position: 'top',
                    variant: 'subtle',
                    duration: 5000,
                    isClosable: true
                })
                nav("/dashboard")
            }

        } else if (!user.watchedAd) {
            setShowAd(true)
            // handlePlay()
        } else {
            nav('/not-registered')
        }


    }
if(!user) return <Loading/>
    return (
        <div>
            <Nav />

            <div >



                {
                    !showAd ? (
                        <Fade left duration={1500}>
                            <div onClick={() => { check() }} className=' watch'>
                                <div>
                                    Watch and Earn
                                </div>
                                <div className="arrows">
                                    <div>
                                        <Forward />
                                    </div>
                                    <div>
                                        <Forward />
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    ) :
                        (
                            <center>
                                {loading && <Spinner size='xl' thickness='5px' />}
                                

                                {!loading && value && (
                                    <div style={{ marginTop: '10px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Fade>
                                            <video
                                                style={{ borderRadius: '4px' }}
                                                ref={vidRef}
                                                width="90%"
                                                height="360"
                                                onEnded={handleVideoEnd}
                                                autoPlay
                                            >
                                                <source src={value} />
                                                Your browser does not support the video.
                                            </video>
                                        </Fade>
                                        {/* {
                                            !showPause && (
                                                <div className='video-actions' onClick={handlePlay}>
                                                    <button className='btn'  ><PlayArrow /></button>
                                                </div>
                                            )
                                        }
                                        {
                                            showPause && (
                                                <div className='video-actions' onClick={handlePause}>
                                                    <button className='btn' ><Pause /></button>
                                                </div>
                                            )
                                        } */}
                                    </div>
                                )
                                }
                            </center>
                        )
                }

                <Fade right duration={1500}>
                    <Link to="/read-articles">
                        <div className='read'>
                            <div >
                                Read and earn
                            </div>
                            <div className="arrows">
                                <div>
                                    <Forward />
                                </div>
                                <div>
                                    <Forward />
                                </div>
                            </div>
                        </div>
                    </Link>

                </Fade>

            </div>

            <div className='ms-2 mt-5'>
                <h5>HOW IT WORKS?</h5>
                <div>
                    <small>
                        If you are looking for a way to make some extra money from
                        the comfort of your own home. Well, you're in luck! we allow users to earn
                        money by simply watching ads and reading articles.
                        It's a simple and convenient way to earn a little extra cash
                        in your free time. Help us to help you! <b>you can also join the team and advertise your own business. Just click the link below:</b>
                    </small>
                </div>
            </div>

            <Fade bottom duration={1500}>
                <Link to="/loading">
                    <div className="become mt-3">

                        <div >
                            Advertise
                        </div>
                        <div className="arrows">
                            <div>
                                <Forward />
                            </div>
                            <div>
                                <Forward />
                            </div>
                        </div>
                    </div >

                </Link>

            </Fade>
            <br />
            <br />
            <br />
            <br />
            <Footer />
        </div>
    );
}

export default Ads;