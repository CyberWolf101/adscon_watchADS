import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../config';
import useAuth from '../hooks/auth';

function Repel() {
    const navigate = useNavigate()

    const [authUser, error] = useAuthState(auth);

        if (!authUser) {
            navigate('/login')
        };

   

}

export default Repel;