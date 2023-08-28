import { doc, getDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
//npm install --save react-firebase-hooks
import { auth, db } from '../config';
import { userContext } from '../contexts/userContext';

function useAuth() {
    const [authUser, isLoading, error] = useAuthState(auth)
    const [userDetail, setuserDetail] = useContext(userContext)

    const [user, setUser] = useState({});
    const [loading, setloading] = useState(true);

    useEffect(() => {
        //because we want all the user info and not just that in auth collection so we search the firestore for the one that matches the id in the auth collection

        const fetchData = async () => {
            setloading(true)
            const ref = doc(db, "users", authUser.uid);    //just a reference to get the user's id
            const recieved = await getDoc(ref);
            setuserDetail(recieved.data())
            setUser(recieved.data());
            setloading(false);
        }
        if (!isLoading) {
            if (authUser) {
                fetchData()
                console.log(user)

            } else {
                setloading(false)
            }
        }
    }, [isLoading])
    return { user: user, loading: isLoading, error: error };


}

export default useAuth;