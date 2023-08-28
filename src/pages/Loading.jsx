import React, { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/react'
import { animateScroll } from 'react-scroll';
import { Fade } from 'react-reveal';
function Loading() {
    const [text, setText] = useState(false)
    useEffect(() => {
        animateScroll.scrollToTop({ duration: 100, smooth: true, })
        setTimeout(() => {
            setText(true)
        }, 8000);
    }, [])
    return (
        <div className='load-page'>
                      <div>
                <div className="loader">
                    <div className="box box-1">
                        <div className="side-left"></div>
                        <div className="side-right"></div>
                        <div className="side-top"></div>
                    </div>
                    <div className="box box-2">
                        <div className="side-left"></div>
                        <div className="side-right"></div>
                        <div className="side-top"></div>
                    </div>
                    <div className="box box-3">
                        <div className="side-left"></div>
                        <div className="side-right"></div>
                        <div className="side-top"></div>
                    </div>
                    <div className="box box-4">
                        <div className="side-left"></div>
                        <div className="side-right"></div>
                        <div className="side-top"></div>
                    </div>
                </div>
            </div>
            <div className='loadTxt'>
                    Loading..
                </div>
        </div>
    );
}

export default Loading;