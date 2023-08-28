import { Email, LocationOn, Phone } from '@mui/icons-material';
import React from 'react';

function Footer() {
    return (
        <div className='footer text-black py-5 px-2'>

            <div>
                <h4 className='fw-bold'>CONTACT US</h4>

                <div className='mt-2 ' >
                    <div className='d-flex fw-bold '><LocationOn  style={{color:' #3182CE'}}/>&nbsp; Atlanta, US</div>
                    <div className='d-flex  fw-bold my-2'> <Phone style={{color:' #3182CE'}}/>&nbsp; call +1 338 756 7732</div>
                    <div className='d-flex fw-bold '><Email style={{color:' #3182CE'}}/>&nbsp; support@adscon.online  </div>

                </div>
            </div>

            <div className='my-3'>
                <h4 className='fw-bold mb-2'>SERIVES</h4>
                <div className="">
                    <div>Metaverse Development</div>
                    <div> Wallet</div>
                    <div> White label exchange</div>
                    <div>DeFi Decentralized Finance Development</div>
                    <div>Dapps Exchange</div>
                    <div> IT Maintenance</div>
                </div>
            </div>

            <div>
                <h4 className='fw-bold mb-2'>NEWSLETTER</h4>
                <div>
                    <input type="text" placeholder='Enter your email' className="form-control py-2" />
                    <button className='btn myBtn mt-2'>SUBSCRIBE</button>
                </div>
            </div>

            <hr />
            <center>
               <h6> @2019 - 2023 All Rights Reserved.</h6>

               <small className="">Terms & Condition | Privacy Policy</small>
            </center>
        </div>
    );
}

export default Footer;