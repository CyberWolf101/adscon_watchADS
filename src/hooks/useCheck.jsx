import { useToast } from "@chakra-ui/react"
import useAuth from "./auth"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config";
import { useContext } from "react";
import { userContext } from "../contexts/userContext";



export const Usecheck = () => {
    const { userDetail } = useContext(userContext)
    const toast = useToast()
    const check = async () => {
        console.log(userDetail)
        if (userDetail) {

            if (!userDetail?.alerted) {
                const docRef = doc(db, 'users', userDetail?.id)

                const d = await getDoc(docRef)
                 d.data()
                await updateDoc(docRef, {
                    alerted: true,
                })

                toast({
                    title: 'BALANCE UPDATE',
                    description: 'your balance was recently updated!',
                    variant: 'subtle',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
            } else {
                console.log('checked')
            }
        }
    }
    return { check }
}