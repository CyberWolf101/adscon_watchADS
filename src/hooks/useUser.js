import { useToast } from "@chakra-ui/react";
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../config";


export function useUser(id) {
    const q = query(doc(db, "users", id))
    const [user, isLoading] = useDocumentData(q)
    return { user, isLoading };
}


export const useUsers = () => {
    const [users, isLoading] = useCollectionData(collection(db, "users"))
    return { users, isLoading }
}



export const useDepo = () => {
    const [deposits, setDeposits] = useState([])

    const collectionRef = collection(db, 'Depositors');
    function getDeposits() {
        onSnapshot(collectionRef, (data) => {
            setDeposits(data.docs.map((depo) => ({ ...depo.data(), id: depo.id })))
        })
        console.log(deposits)

    }
    return { getDeposits, deposits }

}

export const useWithdraw = () => {
    const [withdrawals, setWithdrawals] = useState([])

    const collectionRef = collection(db, 'Withdrawals');
    function getWithdrawals() {
        onSnapshot(collectionRef, (data) => {
            setWithdrawals(data.docs.map((drawal) => ({ ...drawal.data(), id: drawal.id })))
        })
        console.log(withdrawals)

    }
    return { getWithdrawals, withdrawals }

}


export const useTraders = () => {
    const [traders, settraders] = useState([])

    const collectionRef = collection(db, 'traders');

    const q1 = query(collectionRef, orderBy("created_at", "asc"));
    function getTraders() {
        onSnapshot(q1, (data) => {
            settraders(data.docs.map((trader) => ({ ...trader.data(), id: trader.id })))
        })
        console.log(traders)

    }
    return { getTraders, traders }

}


export const useRegistrants = () => {
    const [registrants, setregistrants] = useState([])

    const collectionRef = collection(db, 'Registrants');

    const q1 = query(collectionRef, orderBy("created_at", "asc"));
    function getRegistrants() {
        onSnapshot(q1, (data) => {
            setregistrants(data.docs.map((reg) => ({ ...reg.data(), id: reg.id })))
        })
        console.log(registrants)

    }
    return { getRegistrants, registrants }

}
