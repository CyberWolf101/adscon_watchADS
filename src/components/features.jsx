import React, { useState } from 'react';
import { Fade } from "react-reveal"
import { AttachMoney, GppGood, Lock, MoneyOffRounded, MoneyOutlined, MoneySharp, Payment, PaymentTwoTone, Payments, Shield } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function Features(props) {
    const [fund] = useState("All funds and profits are safely secured and withdrawable as long as the minimum withdrawable amount has been ecxeeded. All earnings by users are securely monitiored and cautiously distributed accordingly to ensure the best user experience.")

    return (
        <div>

            <div className="features ">
                <Fade left duration={1500}>
                    <div className="features-contents">
                        <div className="feat-icons" >
                            <GppGood fontSize='inherit' className="feat-icons" />
                        </div>
                        <h3>Safe and secure</h3>
                        <p className=" ">
                            This platform was built on trust and tactical financing which
                            promted it's growth and maximized users satisfaction. Beware of fake
                            sites and fraudsters that aim to claim your assets do not share your
                            password with any one so as to avoid getting scammed.
                            <center> <div className="divider mt-3"></div></center>

                        </p>

                    </div>
                </Fade>

                <Fade right duration={1500}>
                    <div className="features-contents">
                        <div className="feat-icons" >
                            <Lock fontSize='inherit' className="feat-icons" />
                        </div>
                        <h3>Trusted Services</h3>
                        <p className=" ">
                            {fund}
                            <center> <div className="divider mt-3"></div></center>
                        </p>
                    </div>
                </Fade>

                <Fade left duration={1500}>
                    <div className="features-contents">
                        <div className="feat-icons" >
                            <Payments fontSize='inherit' className="feat-icons" />
                        </div>
                        <h3>Guaranteed Payments</h3>
                        <p className="">
                        Our reward system is designed to be transparent, ensuring that you know exactly what you can earn and how you can redeem your rewards. We provide clear information about the types of rewards available, the criteria for earning them, and the redemption process. This transparency eliminates ambiguity and ensures you are fairly rewarded for your engagement.


                            <center> <div className="divider mt-3"></div></center>
                        </p>
                    </div>
                </Fade>

            </div>
        </div >
    );
}

export default Features;