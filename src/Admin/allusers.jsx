import { Heading, SimpleGrid, Spinner } from '@chakra-ui/react';
import React from 'react';
import { Fade } from 'react-reveal';
import MappedUsers from './MappedUsers';
import { useUsers } from '../hooks/useUser';
import Loading from '../pages/Loading';
import { useEffect } from 'react';
import useAuth from '../hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function AllUsers() {

    const { user, isLoading: authLoading } = useAuth()
    const nav = useNavigate()
    const [search, setSearch] = useState('')

    const { users, isLoading } = useUsers();

    if (isLoading || !user?.email?.includes('admin')) return <Loading />
    return (
        <div className='app'>
                <div className='steps '>
                    <div className='pt-4 pb-3 mx-4'>
                        <label>Find user:</label>
                        <input type="text" value={search}  onChange={(e) => { setSearch(e.target.value) }} className='form-control' placeholder='user name or rederal code' />
                    </div>
                    <Heading as='h4' size='md' color="teal" align="center" mt="">
                        ALL USERS
                    </Heading>
                    <SimpleGrid colums={[2, 3, 4]} spacing={[2, 3]} px="10px" py="6">
                        {
                            users?.filter((user) => {
                                return search.toLowerCase() === "" ? user.name : user.name.toLowerCase().includes(search.toLowerCase()) ||  user.referalCode.toLowerCase().includes(search.toLowerCase());
                            }).map((user) => (
                                <MappedUsers key={user.id} user={user} />
                            ))
                        }

                    </SimpleGrid>
                </div>
                <br />
                <br />
                <br />
                <br />
        </div>
    );
}

export default AllUsers;

