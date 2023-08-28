import React from 'react';
import { Approval, ContentPaste, LockClock, MonetizationOn, Payments, Person, PlayCircle } from '@mui/icons-material';
import useAuth from '../hooks/auth';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useToast } from '@chakra-ui/react';
import { Userepel } from '../hooks/useRepel';
import Nav from './nav';

function Earn({display}) {
    const { user, isLoading: authLoading } = useAuth()
    const { repel } = Userepel()
    const Toast = useToast()

    function copied() {
        Toast({
            title: 'referal code copied',
            status: 'info',
            colorScheme: 'blue',
            variant: 'subtle'
        })
    }
    return (
        <div>
            <Nav display={display}/>
            <div className='mx-3'>
                <hr />

                <h5 className='text-primary ms-2 mb-3'>How to earn</h5>

                <div className='direction shadow'>
                    <div>
                        <div>Earn by Referal</div>
                        <small>When a user signs up and register with your referal code, a 25% bonous will be added to your total referal balance. copy referal code below: </small>
                        <div className='d-flex my-2'>
                            <input type="text" className='form-control input_button' disabled value={user.referalCode ? user.referalCode : "BT.."} style={{ height: '42px' }} />
                            <CopyToClipboard text={user?.referalCode}>
                                <button className='btn  button_input ' style={{ height: '42px', whiteSpace: 'nowrap' }} onClick={copied}>copy <ContentPaste fontSize='small' /></button>
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>
                <br />

                <div className='direction shadow'>
                    <div>
                        <div>Earn by Promotion</div>
                        <small>Users can earn money just by watching ads and reading articles. Easy right? click the link below to earn now. </small>
                        <div className=''>
                            <center>
                                <button className="btn myBtn my-2" onClick={() => repel(user, "/Ads")}>Watch Ads <PlayCircle /></button>
                            </center>
                        </div>
                    </div>
                </div>


                <br />
                <div className='direction shadow'>
                    <div>
                        <div>Earn by Erollment</div>
                        <small>Earn while other users watch ads. Once a user is registered, they can earn a total of 1.5% of their enrollment deposit weekly while other users watch ads. </small>
                        <div className=''>
                            <center>
                                <button onClick={() => repel(user, "/enroll")} className="btn myBtn my-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Eroll Now <Approval /> </button>
                            </center>
                        </div>
                    </div>
                </div>

            </div>
            <br />
            <br />
            <br />
        </div>
    );
}

export default Earn;