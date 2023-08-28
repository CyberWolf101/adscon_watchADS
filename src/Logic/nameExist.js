import { collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react';
import { db } from '../config';

async function NameExist(username) {
    const q = query(collection(db, "users"), where("username", "==", username))
    const querySnapshot = await getDocs(q);
    return querySnapshot.size > 0; //so if the size is greater than 0 then there is a doc that matches they query else it returns false so the user doesn't exist
}

export default NameExist;