import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from "./config";
import { data } from "./new-data";


export const setDocument = async ( uid, lastname, firstname, email, phone, type, track ) => {

    await setDoc(doc(db, "users", uid), {

        lastname : lastname,
        firstname : firstname,
        email : email,
        phone : phone,
        applications : {
            cohort4 : []
        },
        uid : uid,
        type : type,

    });

   if (type === 'council') {
    setCouncilDocument(uid, lastname, firstname, email, type, track)
   }

   if (type === 'admin') {
    setAdminDocument(uid, lastname, firstname, email, type)
   }

}

export const setCouncilDocument = async ( uid, lastname, firstname, email, type, track) => {

    await setDoc(doc(db, "council", uid), {

        lastname : lastname,
        firstname : firstname,
        email : email,
        type : "council",
        uid : uid,
        track : track,
        psw : "psw",
        img : ""

    });

}

export const setAdminDocument = async ( uid, lastname, firstname, email, type) => {

    await setDoc(doc(db, "admin", uid), {

        lastname : lastname,
        firstname : firstname,
        email : email,
        type : type,
        uid : uid

    });

}

export const getUser = async (uid) => {

    const docRef = doc(db, "council", uid);
    
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

        return docSnap.data()

    } else {

        console.log("No such document!");

    }
}

export const getAUser = async (uid) => {

    const docRef = doc(db, "users", uid);
    
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

        return docSnap.data()

    } else {

        console.log("No such document!");

    }
}









