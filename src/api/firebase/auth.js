import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, collection, query, getDocs, where } from "firebase/firestore"; 
import { db } from "./config";
import { data } from "./new-data";
import axios from "axios";


export const setDocument = async ( uid, lastname, firstname, email, phone, type, track, password ) => {

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

   await axios.post('/api/sendemail/register', {email : email, firstname : firstname, lastname, password});

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


export const getCouncilData = async () => {

    const fetchUsers = query(collection(db, "council"), where("internal", "==", true));
    
    const querySnapshot = await getDocs(fetchUsers);

    const allUsers = []

    querySnapshot.forEach((doc) => {
    
        allUsers.push(doc.data());

    });

    return allUsers;

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

    return docSnap.data();

}

export const getUsersInfo = async (uid) => {

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    
    const dataDetails = await docSnap.data()

    return dataDetails;
    
}

export const getDataExport = async (data) => {

    const user = {
        data : {}
    }

    data.forEach(async res => {

        await getUsersInfo(res.data.uid).then(ent => user.data = ent)

    })

   console.log(user)
    
}









