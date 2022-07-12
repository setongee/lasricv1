import { type } from "@testing-library/user-event/dist/type";
import { doc, updateDoc, getDocs, collection, deleteDoc, addDoc, where, query, orderBy, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config";


//COUNCIL INFORMATION

export const setCouncilInfomation = async (uid, data) => {

    const docRef = doc(db, "council", uid);

    await setDoc(docRef, data)

}

//User 2 INFORMATION

export const setUser2InUsers = async () => {

    const newCounciilRef = await collection(db, "submittedApplications")
    const queryUsers = await getDocs(newCounciilRef)

    queryUsers.forEach( user => {

        setUsersInUser2(user.id, user.data())

    })
    
}

export const setUsersInUser2 = async (uid, data) => {

    const docRef = doc(db, "submitted_applications_beta", "cohort4", "applications", uid);
    await setDoc(docRef, data)

}

//setUser2InUsers()



//Add COUNCIL INFORMATION

export const addNewCouncil = async (data) => {

    const newCounciilRef = await addDoc(collection(db, "council"), data)

    const councilCreated = await doc(db, "council", newCounciilRef.id);

    await updateDoc(councilCreated, {

        uid: newCounciilRef.id

    });

}


export const deleteFunction = async (document, uid) => {

    await deleteDoc(doc(db, document, uid));

}

//deleteFunction("submittedApplications", "LASRIC_j7njo6aTElgYdPXCAqPc_0xFpjEhEkoZFYp5ipkcISjGa3OG2")

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

    const cohortN = await getCurrentCohortNumber().then(cohortNum => cohortNum[0].present)

    const fetchApplications = collection(db, "applications_data", `cohort${cohortN}`, "applications");
    const querySnapshot = await getDocs(fetchApplications);

    const allApplications = []

    querySnapshot.forEach((doc) => {
    
        allApplications.push(doc.data());

    });

    return allApplications

}

// GET Council Graded APLLICATIONS

export const getCouncilGradedApps = async () => {

    const cohortN = await getCurrentCohortNumber().then(cohortNum => cohortNum[0].present)

    const fetchApplications = collection(db, "submitted_applications_beta", `cohort${cohortN}`, "applications");
    const querySnapshot = await getDocs(fetchApplications);

    const allApplications = []

    querySnapshot.forEach((doc) => {
    
        allApplications.push( Object.keys(doc.data().grades).length );

    });

    return allApplications

}

// GET ALL UNSUBMITTED APPS

export const getAllUnsubmittedApps = async () => {

    const cohortN = await getCurrentCohortNumber().then(cohortNum => cohortNum[0].present)

    const fetchUnsubmitted = query(collection(db, "submitted_applications_beta", `cohort${cohortN}`, "applications"), where("submitted", "==", false));
    const querySnapshot = await getDocs(fetchUnsubmitted);

    const allUnsubmitted = []

    querySnapshot.forEach((doc) => {
    
        allUnsubmitted.push(doc.data());

    });

    return allUnsubmitted;

}


// GET SUBMITTED APPS

export const getSubmittedApps = async () => {
    
    const cohortN = await getCurrentCohortNumber().then(cohortNum => cohortNum[0].present)

    const querySnapshot = await getDocs( query(collection(db, "submitted_applications_beta", `cohort${cohortN}`, "applications"),orderBy("dateSubmitted", "desc"))  );
    

    const allSubmittedApplications = []

    querySnapshot.forEach((doc) => {
    
        allSubmittedApplications.push({data : doc.data(), id : doc.id});

    });

    return allSubmittedApplications

}


// GET Interview Bucket APPS

export const getInterviewBucketApps = async () => {

    const passmark = await getPassmark().then( e => e.grade );
    const cohortN = await getCurrentCohortNumber().then(cohortNum => cohortNum[0].present)

    const fetchBucket = query(collection(db, "submitted_applications_beta", `cohort${cohortN}`, "applications"), where("avgGrade", ">=", passmark));
    const querySnapshot = await getDocs(fetchBucket);

    const data = []

    querySnapshot.forEach((doc) => {
    
        data.push({data : doc.data(), id : doc.id});

    });

    return data;
}


// GET Pending Applications

export const getPendingApps = async () => {

    const cohortN = await getCurrentCohortNumber().then(cohortNum => cohortNum[0].present)

    const fetchBucket = query(collection(db, "submitted_applications_beta", `cohort${cohortN}`, "applications"), where("avgGrade", "==", 0) );
    const querySnapshot = await getDocs(fetchBucket);

    const data = []

    querySnapshot.forEach((doc) => {
    
        data.push({data : doc.data(), id : doc.id});

    });

    return data;
}


// GET Graded Applications

export const getGradedApps = async () => {

    const cohortN = await getCurrentCohortNumber().then(cohortNum => cohortNum[0].present)

    const fetchBucket = query(collection(db, "submitted_applications_beta", `cohort${cohortN}`, "applications"), where("avgGrade", ">", 0));
    const querySnapshot = await getDocs(fetchBucket);

    const data = []

    querySnapshot.forEach((doc) => {
    
        data.push({data : doc.data(), id : doc.id});

    });

    return data;
}

// get current cohort number

export const getCurrentCohortNumber = async () => {

    const documentRef = doc(db, "preferences", "cohort");

    const documentRefSnap = await getDoc(documentRef);

    const grader = [];

    if (documentRefSnap.exists()){

        grader.push(documentRefSnap.data());
        
    }

    return grader;

}

// get current passmark

export const getPassmark = async () => {

    const documentRef = doc(db, "preferences", "passmark");

    const documentRefSnap = await getDoc(documentRef);

    return documentRefSnap.data();

}

// Get Council Member Listing

export const getCouncilMemberListing = async () => {

    const fetchApplications = collection(db, "council");
    const querySnapshot = await getDocs(fetchApplications);

    const data = [];

    querySnapshot.forEach((doc) => {
    
        data.push({data : doc.data(), id : doc.id});

    });

    return data;

}

export const getCouncilGradeTrack = async (track) => {

    const fetchApplications = collection(db, "submittedApplications");
    const querySnapshot = await getDocs(fetchApplications);

    const allApplications = {

        stem : [],
        innovation : [],
        research : [],
        secsch : []
    }

    querySnapshot.forEach((doc) => {
    
        //allApplications.push( Object.keys(doc.data().grades).length );
        
        switch ( doc.data().track ) {

            case "stem":
                allApplications.stem.push(doc.data())
                break;

            case "innovation":
                allApplications.innovation.push(doc.data())
                break;
            
            case "secsch":
                allApplications.secsch.push(doc.data())
                break;

            default:
                allApplications.research.push(doc.data())
                break;
        }

    });


    return fullDataNeeded(allApplications, track).then( res => {

       return res

    } )

}


const fullDataNeeded = async (trackTotal, track) => {


    var calculate = {
        total : 0
    }

    if ( track.includes("stem") ) { calculate.total += trackTotal.stem.length }
    if ( track.includes("innovation") ) { calculate.total += trackTotal.innovation.length }
    if ( track.includes("secsch") ) { calculate.total += trackTotal.secsch.length }
    if ( track.includes("research") ) { calculate.total += trackTotal.research.length }

    return calculate

}


export const getCouncilApps = async (uid) => {

    const fetchApplications = collection(db, "submittedApplications");
    const querySnapshot = await getDocs(fetchApplications);

    const allApplications = {}
    const dataStage = [];

    querySnapshot.forEach((doc) => {

        if ( doc.data().grades.hasOwnProperty(uid) ) {

            dataStage.push( doc.data() );

        }

    });

    allApplications[uid] = dataStage;

    return allApplications

}





//////////////////////////////// TEST AREAS /////////////////////////////////////


//export const testUser = async () => {

    //     const fetchApplications = collection(db, "submittedApplications");
    //     const querySnapshot = await getDocs(fetchApplications);
    
    //     querySnapshot.forEach((doc) => {
    
    //     //updateDocumentUser(doc.id, testUser2(doc.id));
    //     //testUser2(doc.id, doc.data());
    
    //         //testUser2(doc.data().uid);
    
    //         //   if ( doc.id ===  `LASRIC_j7njo6aTElgYdPXCAqPc_LASRIC_j7njo6aTElgYdPXCAqPc_${doc.data().uid}`) {
    
    //         //       //deleteFunction("submittedApplications", `LASRIC_j7njo6aTElgYdPXCAqPc_LASRIC_j7njo6aTElgYdPXCAqPc_${doc.data().uid}`)
    
    //         //   } else {
    //         //       console.log("cant find any doc")
    //         //   }
    
    
    //         // updateDocumentUser(`LASRIC_j7njo6aTElgYdPXCAqPc_${doc.id}`, doc.data())
    
    //     });
    
    // }
    
    // export const testUser2 = async (uid) => {
    
    //     const docRef = doc(db, "applications", `LASRIC_j7njo6aTElgYdPXCAqPc_${uid}`);
    //     const docRef1 = doc(db, "users2", uid);
    //     const dataMin = await getDoc(docRef1)
    
    //     //console.log(dataMin.data())
    
    //     if (dataMin.data() !== undefined) {
    
    //         await setDoc(docRef, {
    
    //             uid : `LASRIC_j7njo6aTElgYdPXCAqPc_${uid}`,
    //             data : dataMin.data().form.data,
    //             grade : 0,
    //             gradedBy : [],
    //             status : "pending",
    //             submitted : true,
    //             track : "secsch"
        
    //         })
    
    //     }
    
    //     //updateDocumentUser(`LASRIC_j7njo6aTElgYdPXCAqPc_${uid}`, data)
    
    // }
    
    // export const updateDocumentUser = async (uid, data) => {
    
    //     const documentRef = doc(db, "submittedApplications", uid);
    
    //     await updateDoc(documentRef, { "dateSubmitted" : new Date (data.dateSubmitted) });
    
    // }
    
    
    