import { useToast } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config';

export function useLogout() {
    const nav = useNavigate()
    const toast = useToast()        //used for alerts

    const [signout, isLoading, error] = useSignOut(auth);  //implementing react-firebase-hooks for logout
    
    async function logout() {
        if (await signout()) {
            toast({
                title: "You are logged out",
                status: "info", //for green
                isClosable: true,
                position: "top",
                duration: 5000,
                variant: 'subtle',

            })
            nav('/login')

        } else {

        }
    }
    return { logout, isLoading, error };

}

