import React, { useState } from 'react';
import { createContext } from 'react';
import useAuth from '../hooks/auth';

export const userContext = createContext()


function UserContextProvider({ children }) {
    // const { user } = useAuth()
    // const { user: value } = useAuth()
    const [userDetail, setuserDetail] = useState({})


    return (
        <userContext.Provider value={[userDetail, setuserDetail]} >
            {children}
        </userContext.Provider>
    );
}

export default UserContextProvider;