//check into db

import { doc, updateDoc, getDocs, collection, arrayUnion } from "firebase/firestore";
import { db } from "./config";

export const getAllSubmittedApplications = async () => {

    const querySnapshot = await getDocs(collection(db, "submittedApplications"));

    const result = []

    querySnapshot.forEach((doc) => {
        
        result.push( { id : doc.id, data : doc.data() } )

    });

    return result;

}

export const updateGrade = async (appid, score, uid) => {

    const documentRef = doc(db, "submittedApplications", appid);
    await updateDoc(documentRef, { "gradedBy" : arrayUnion({uid, grade : score}) });
    await updateDoc(documentRef, { "status" : "graded" });

}