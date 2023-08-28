import React from 'react';
import Nav from '../components/nav';

function Read(props) {
    return (
        <div>
            <Nav />

            <div className='read-page'>
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
                    <div className='getting loadTxt'>
                        Getting articles..
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Read;