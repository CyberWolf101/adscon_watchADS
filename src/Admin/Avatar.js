import React from 'react';
import { Avatar as ChakraAvatar, Spinner } from '@chakra-ui/react';
import { Link } from "react-router-dom"
import useAuth from '../hooks/auth';

const Avatar = ({ user, size = 'sm', overideAvatar = null }) => {   
    // console.log(post)
    //the overideAvatar will help the change dp function
    // const {user, isLoading}= useAuth()
    if (!user) return <Spinner size="sm" />
    return (
        <div>
            <ChakraAvatar
                as={Link}
                to={`/protected/profile/${user?.id}`}
                name={user?.username}
                src={overideAvatar || user.avatar}
                size={size}
                _hover={{ cursor: "pointer", opacity: "0.8" }}
            />
        </div>
    );
};

export default Avatar;