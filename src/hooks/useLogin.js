import { useToast } from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config';

export function UseLogin() {

    const navigate = useNavigate()
    const toast = useToast()        //used for alerts
    const [isLoading, setLoading] = useState(false);

    async function login({ email, password, redirectTo = '/' }) {
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password)
            toast({
                title: "You are logged in!",
                status: "success", //for green
                isClosable: true,
                position: "top",
                duration: 3000,
                variant: 'subtle',
                colorScheme:'blue'

            });
            localStorage.setItem('email', JSON.stringify(email))
            navigate(redirectTo)

        } catch (error) {
            console.log(error.message)
            toast({
                title: "Login Failed",
                description: "Incorrect email or password",
                status: 'error',
                isClosable: true,
                position: "top",
                duration: 3000,
                variant: 'subtle'

            })
            setLoading(false);
            return false;
        }

        setLoading(false);
        return true;
    }


    return { login, isLoading };

}

