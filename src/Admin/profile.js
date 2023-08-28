import { Button, Divider, Spinner, Stack, Text, position, useDisclosure, useToast } from '@chakra-ui/react';
import { format } from 'date-fns';
import React from 'react';
import { useParams } from 'react-router-dom';
import Avatar from './Avatar';
// import ModalDisplay from '../components/modal';
import { useUser } from '../hooks/useUser';
import useAuth from '../hooks/auth';
import Nav from '../components/nav';
import { Link } from 'react-router-dom';
import { PeopleAlt, SaveAlt } from '@mui/icons-material';
import Loading from '../pages/Loading';
import { useState } from 'react';
import { useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config';

function UserProfile() {
    const { id } = useParams()
    const { user: authUser, isLoading: authLoading } = useAuth()
    // const { posts, isLoading: postsLoading } = useSpecificPosts(id);
    const { user, isLoading: userLoading } = useUser(id)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [activeDeposit, setDeposit] = useState("")
    const [referalBal, setReferal] = useState("")
    const [earnings, setEarnings] = useState("")
    const [updating, setUpdating] = useState(false)
    const toast = useToast()

    const handleShit = () => {
        setUpdating(true)
        if (!referalBal || !activeDeposit || !earnings) {
            setUpdating(false)
            toast({
                title: 'Error',
                description: 'please update all fields',
                status: 'error',
                position: 'top',
                variant: 'subtle',
                isClosable: true,
            })
            return
        } else {
            const docRef = doc(db, 'users', id)
            updateDoc(docRef, { activeDeposits: parseInt(activeDeposit), referalBalance: parseInt(referalBal), earnings: parseInt(earnings) })
                .then(() => {
                    toast({
                        title: 'success',
                        description: 'updated successfuly',
                        position: 'top',
                        colorScheme: 'blue',
                        variant: 'subtle',
                        isClosable: true,
                    })
                    setUpdating(false)
                    setDeposit('')
                    setReferal('')
                    setEarnings('')

                })
        }
    }

    if (userLoading || authLoading) return <Loading />


    return (
        <div className="app">
            <div className="main-body">
                <Nav />

                <div className=''>
                    <Stack spacing="5" mt="3">
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Avatar size='xl' user={user} />
                            <Text fontSize="2xl">
                                {user.name}

                            </Text>

                            <small>{user.email}</small>
                            <Text color="white" fontSize={["sm", "lg"]}>
                                Joined: <b>{format(user.date, "MMM YYY")}</b>
                            </Text>

                        </div>
                    </Stack>

                    <div className='mx-4'>
                        <label>Active Deposit:</label>
                        <input type="text" className='form-control ' value={"$" + user?.activeDeposits + " is the former value"} />
                        <input type="number" className='form-control ' value={parseInt(activeDeposit)} placeholder='Enter new value' onChange={(e) => setDeposit(e.target.value)} />

                        <br />
                        <label>Referal Balance:</label>
                        <input type="text" className='form-control ' value={"$" + user?.referalBalance + " is the former value"} />
                        <input type="number" className='form-control ' value={parseInt(referalBal)} placeholder='Enter new value' onChange={(e) => setReferal(e.target.value)} />

                        <br />
                        <label>Earnings:</label>
                        <input type="text" className='form-control ' disabled value={"$" + user?.earnings + " is the former value"} />
                        <input type="number" className='form-control ' value={parseInt(earnings)} placeholder='Enter new value' onChange={(e) => setEarnings(e.target.value)} />

                        <Button
                            className='btn btn-light mt-3'
                            onClick={handleShit}
                            isLoading={updating}
                        >

                            UPDATE
                        </Button>

                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;