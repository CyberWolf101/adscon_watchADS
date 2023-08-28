import React, { useState } from 'react';
import { Fade } from 'react-reveal';
import { Checkbox, Spinner, useToast } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { UseSignup } from '../hooks/useSignup';
import { setRef } from '@material-ui/core';
import { auth } from '../config';
import { createUserWithEmailAndPassword } from 'firebase/auth';


function Signup(props) {
    const [email, setEmail] = useState('')
    const [checked, setChecked] = useState(false)
    const [red, setred] = useState(true)
    const [password, setPassword] = useState('')
    const [referal, setReferal] = useState("")
    const [name, setName] = useState('')
    const { signup, isLoading } = UseSignup()
    const nav = useNavigate()
    const toast = useToast()

    function agree() {
        setChecked(!checked)
        setred(!red)
    }

    const handleSignup = async (email, password, name, referal) => {
        if (password.length < 5) {
            toast({
                title: "Invalid password",
                description: "password must contain atleast 5 characters",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 4000,
                variant: 'subtle'

            });
            return;

        }
        if (!name) {
            toast({
                title: "Error",
                description: "must provide a name",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 4000,
                variant: 'subtle'

            });
            return;
        }
        if (referal.length && referal.length < 16) {
            toast({
                title: "INVALID REFERALCODE",
                description: "Referal code is optional, you can skip this process",
                status: "info",
                isClosable: true,
                position: "top",
                duration: 5000,
                variant: 'subtle'

            });
            return;
        }
        if (referal.includes("BT") && referal.length < 16) {
            toast({
                title: "INVALID REFERALCODE",
                description: "Referal code is optional, you can skip this process",
                status: "info",
                isClosable: true,
                position: "top",
                duration: 5000,
                variant: 'subtle'

            });
            return;
        }
        if (!checked) {
            setred(false)
            toast({
                title: "Error",
                description: "must agree to terms of service!",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 3000,
                variant: 'subtle'

            });
            return;
        }
        console.log(email, password, name, referal)
        const success = await signup({
            email: email,
            password: password,
            name: name,
            referal: referal
        });
        // console.log(pass)


    }
    return (
        <div>
            <Fade>
                <form autoComplete={false}>
                    <input type="email" className=' mt-3 form-control ' placeholder='email' required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <input type="password" className=' mt-3 form-control ' placeholder='password' required value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <input type="text" className=' mt-3 form-control ' placeholder='first name' required value={name} onChange={(e) => { setName(e.target.value) }} />
                    <input type="text" className=' mt-3 form-control ' placeholder='referal code(optional)' value={referal} onChange={(e) => { setReferal(e.target.value) }} />
                    {/* <div className="d-flex mt-2" >
                        <Checkbox style={{alignItems:"baseline"}}><small><span>i agree to bithron's </span><Link to="/" style={{color:'navy', fontWeight:'bolder'}}>Terms of service</Link></small></Checkbox>
                    </div> */}


                    {!isLoading && (
                        <div className="button btn" onClick={() => handleSignup(email, password, name, referal)}>

                            SIGN UP
                        </div>
                    )}
                    {isLoading && (
                        <div className="button btn" >
                            <Spinner />
                        </div>
                    )}

                </form>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', width: '130%', position: 'absolute', left: '-40px' }}>
                    <input className={red ? "form-check-input mt-3": "form-check-input mt-3  border-danger border border-2 "} type="checkbox" value={checked} onClick={agree} style={{ padding: '3px' }} />
                    <small style={{ fontSize: '12px', marginLeft: '5px' }}>I have read and agreed to <a href="/terms" className='terms-link'>terms and conditions.</a></small>
                </div>
            </Fade>
        </div>
    );
}

export default Signup;