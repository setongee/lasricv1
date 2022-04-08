import { doc, updateDoc, getDocs, collection, arrayUnion, where, query, orderBy, getDoc } from "firebase/firestore";
import { db } from "../config";


//GET ALL USERS

export const getAllUsers = async () => {

    const fetchUsers = query(collection(db, "users"), where("type", "==", "user"));
    const querySnapshot = await getDocs(fetchUsers);

    const allUsers = []

    querySnapshot.forEach((doc) => {
    
        allUsers.push(doc.data());

    });

    return allUsers;

}



// GET ALL APLLICATIONS

export const getApplicationsNumber = async () => {

    const fetchApplications = collection(db, "applications");
    const querySnapshot = await getDocs(fetchApplications);

    const allApplications = []

    querySnapshot.forEach((doc) => {
    
        allApplications.push(doc.data());

    });

    return allApplications

}



// GET ALL UNSUBMITTED APPS

export const getAllUnsubmittedApps = async () => {

    const fetchUnsubmitted = query(collection(db, "applications"), where("submitted", "==", false));
    const querySnapshot = await getDocs(fetchUnsubmitted);

    const allUnsubmitted = []

    querySnapshot.forEach((doc) => {
    
        allUnsubmitted.push(doc.data());

    });

    return allUnsubmitted;

}



// GET SUBMITTED APPS

export const getSubmittedApps = async () => {

    const fetchSubmittedApplications = collection(db, "submittedApplications");
    const querySnapshot = await getDocs(fetchSubmittedApplications);

    const allSubmittedApplications = []

    querySnapshot.forEach((doc) => {
    
        allSubmittedApplications.push(doc.data());

    });

    return allSubmittedApplications

}



// GET Interview Bucket APPS

export const getInterviewBucketApps = async () => {

    const fetchBucket = query(collection(db, "submittedApplications"), where("grade", ">=", 80));
    const querySnapshot = await getDocs(fetchBucket);

    const data = []

    querySnapshot.forEach((doc) => {
    
        data.push(doc.data());

    });

    return data;
}



// GET DOCUMENT