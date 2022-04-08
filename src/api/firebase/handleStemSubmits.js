import { doc, updateDoc, setDoc, getDoc, arrayUnion } from "firebase/firestore"; 
import { db } from "./config";
import { data } from "./new-data";

export const createStemApplication = async (callid, userid, formData, track) => {

    await setDoc(doc(db, "applications", `LASRIC_${callid}_${userid}`), {...data.application, track : track, uid : `LASRIC_${callid}_${userid}`, 
    
    data : {

        personal : {

            status : 'completed',
            data : formData

        },
        problem : {

            status : 'pending',
            data : {
                adoptionEase: "",
                need: "",
                workAround: ""
            }

        },
        relevance : {

            status : 'pending',
            data : {
                relevance : '',
                exactSoln: '',
                targetCustomers : ''
            }

        },
        impact : {

            status : 'pending',
            data : {
                missionDrive : '',
                impact : ''
            }

        },
        scalability : {

            status : 'pending',
            data : {
                howScalable : '',
                uniqDiff : ""
            }

        },
        experience : {

            status : 'pending',
            data : {
                team: { team1 : { name: '', response : '', role: ''}},
                experience : ''
            }

        },

    }});

    await updateUserApplication(userid, `LASRIC_${callid}_${userid}`, track, callid);
}

export const submitStemApplication = async (appid, callid, userid, track, firstname, lastname) => {

    //await setDoc(doc(db, "applications", userid), {...data.application.data, [page] : formData });

    const documentRef = doc(db, "applications", appid);
    await updateDoc(documentRef, { "submitted" : true });

    await updateCallupApplications(callid, `LASRIC_${callid}_${userid}`);

    await addToSubmitted(callid, userid, track, firstname, lastname);

}

const addToSubmitted = async (callid, userid, track, firstname, lastname) => {

    await setDoc(doc(db, "submittedApplications", `LASRIC_${callid}_${userid}`), {...data.application, uid : userid , track, firstname, lastname, dateSubmitted : new Date, avgGrade : '0', gradedBy : [], grades : {}, status : 'pending'  } )


}

export const updateStemApplication = async (appid, formData) => {

    //await setDoc(doc(db, "applications", userid), {...data.application.data, [page] : formData });

    console.log(appid)

    const documentRef = doc(db, "applications", appid);
    await updateDoc(documentRef, { "data.problem.data" : formData });
    await updateDoc(documentRef, { "data.problem.status" : "completed" });

}

export const updateStemRelevanceApplication = async (appid, formData) => {

    //await setDoc(doc(db, "applications", userid), {...data.application.data, [page] : formData });

    console.log(appid)

    const documentRef = doc(db, "applications", appid);
    await updateDoc(documentRef, { "data.relevance.data" : formData });
    await updateDoc(documentRef, { "data.relevance.status" : "completed" });

}

export const updateStemImpactApplication = async (appid, formData) => {

    //await setDoc(doc(db, "applications", userid), {...data.application.data, [page] : formData });

    console.log(appid)

    const documentRef = doc(db, "applications", appid);
    await updateDoc(documentRef, { "data.impact.data" : formData });
    await updateDoc(documentRef, { "data.impact.status" : "completed" });

}

export const updateStemExperienceApplication = async (appid, formData) => {

    //await setDoc(doc(db, "applications", userid), {...data.application.data, [page] : formData });

    console.log(appid)

    const documentRef = doc(db, "applications", appid);
    await updateDoc(documentRef, { "data.experience.data" : formData });
    await updateDoc(documentRef, { "data.experience.status" : "completed" });

}

export const updateStemScalabilityApplication = async (appid, formData) => {

    //await setDoc(doc(db, "applications", userid), {...data.application.data, [page] : formData });

    console.log(appid)

    const documentRef = doc(db, "applications", appid);
    await updateDoc(documentRef, { "data.scalability.data" : formData });
    await updateDoc(documentRef, { "data.scalability.status" : "completed" });

}

export const updateStemPersonalApplication = async (appid, formData) => {

    //await setDoc(doc(db, "applications", userid), {...data.application.data, [page] : formData });

    console.log(appid)

    const documentRef = doc(db, "applications", appid);
    await updateDoc(documentRef, { "data.personal.data" : formData });
    await updateDoc(documentRef, { "data.personal.status" : "completed" });

}

export const updateUserApplication = async (uid, appid, track, callid) => {

    const data = {
        appUID : appid,
        track : track,
        submitted : false,
        callUID : callid,
    }

    //console.log(appid)

    const documentRef = doc(db, "users", uid);
    await updateDoc(documentRef, { "applications.cohort4" : arrayUnion(data) });

}

export const updateCallupApplications = async (callupid, appid) => {

    const documentRef = doc(db, "callups", callupid);
    await updateDoc(documentRef, { "applications" : arrayUnion(appid) });

}

