import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from "./config";
import { data } from "./new-data";


export const setDocument = async ( uid, lastname, firstname, email, phone ) => {

    await setDoc(doc(db, "users", uid), {

        lastname : lastname,
        firstname : firstname,
        email : email,
        phone : phone,
        applications : {
            cohort4 : []
        },
        uid : uid

    });

}

export const getUser = async (uid) => {

    if(uid !== '') {

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            return docSnap.data()
    
        } else {
    
            console.log("No such document!");
    
        }
    } else {
        return {}
    }

}









