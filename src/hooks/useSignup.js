import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
// import NameExist from '../Logic/nameExist';

export function UseSignup() {

    // const min = ; // Minimum 8-digit number (10^7)


    const navigate = useNavigate()
    const toast = useToast()        //used for alerts
    const [isLoading, setLoading] = useState(false)
    //so basically what we want is to add a user in the auth section and create one is the firestore collection at the same time so that registered users can match the ones in our fire store collection
    async function signup({
        name,
        referal,
        password,
        email,


    }) {
        setLoading(true);
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password) //now here the user is added to the firebase auth collection and next we want the user in the firestore
            await setDoc(doc(db, "users", res.user.uid), {  //we get the id from the res variable, we use setDoc instead of add doc cus we want to set the id when a user is created
                id: res.user.uid,
                name: name.charAt(0).toUpperCase() + name.slice(1),
                userReferer: referal,
                referalCode: "BT" + Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000,
                referalBalance: 0,
                earnings: 0,
                activeDeposits: 0,
                referalBalance: 0,
                enrolEarning: 0,
                isRegistered: false,
                enrol_start_time: 0,
                enrol_end_time: 0,
                ADday: 0,
                ADmonth: 0,
                avatar: "",
                email: email,
                alerted: true,
                watchedAd: false,
                date: Date.now(),
            })
            localStorage.setItem('email', JSON.stringify(email))
            toast({
                title: "Account Created!",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 5000,
                colorScheme: 'blue',
                variant: 'subtle'

            });

            navigate('/')

        } catch (error) {
            toast({
                title: "Signed up Failed",
                description: "An error occured",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 5000,
                variant: 'subtle'

            });
        } finally {
            setLoading(false)
        }

    }

    return { signup, isLoading }
}
