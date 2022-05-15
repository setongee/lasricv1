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

// GET Council Graded APLLICATIONS

export const getCouncilGradedApps = async () => {

    const fetchApplications = collection(db, "submittedApplications");
    const querySnapshot = await getDocs(fetchApplications);

    const allApplications = []

    querySnapshot.forEach((doc) => {
    
        allApplications.push( Object.keys(doc.data().grades).length );

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

    const querySnapshot = await getDocs( query(collection(db, "submittedApplications"),orderBy("dateSubmitted", "desc"))  );
    //const fetchSubmittedApplications = collection(db, "submittedApplications");

   // const querySnapshot = await getDocs(fetchSubmittedApplications);

    const allSubmittedApplications = []

    querySnapshot.forEach((doc) => {
    
        allSubmittedApplications.push({data : doc.data(), id : doc.id});

    });

    return allSubmittedApplications

}



// GET Interview Bucket APPS

export const getInterviewBucketApps = async () => {

    const fetchBucket = query(collection(db, "submittedApplications"), where("avgGrade", ">=", 80));
    const querySnapshot = await getDocs(fetchBucket);

    const data = []

    querySnapshot.forEach((doc) => {
    
        data.push({data : doc.data(), id : doc.id});

    });

    return data;
}



// GET Pending Applications

export const getPendingApps = async () => {

    const fetchBucket = query(collection(db, "submittedApplications"), where("avgGrade", "==", "0"));
    const querySnapshot = await getDocs(fetchBucket);

    const data = []

    querySnapshot.forEach((doc) => {
    
        data.push({data : doc.data(), id : doc.id});

    });

    return data;
}


// GET Graded Applications

export const getGradedApps = async () => {

    const fetchBucket = query(collection(db, "submittedApplications"), where("avgGrade", ">", 0));
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
        research : []
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

