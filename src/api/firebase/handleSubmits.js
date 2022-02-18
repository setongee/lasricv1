import { doc, updateDoc, setDoc, getDoc, arrayUnion } from "firebase/firestore"; 
import { db } from "./config";
import { data } from "./new-data";

export const createApplication = async (callid, userid, formData, track) => {

    await setDoc(doc(db, "applications", `LASRIC_${callid}_${userid}`), {...data.application, track : track, uid : `LASRIC_${callid}_${userid}`,  
    
    data : {

        personal : {

            status : 'completed',
            data : formData

        },
        vision : {
            status : 'pending',
            data : {

                howBig: "",
                howMoney: "",
                problem: "",
                solnDesc: "",
                uniqVal: "",
                workAround: ""
        }

        },
        proposition : {
            status : 'pending',
            data : {

                brandEffective: "",
                competitors: "",
                custEngagement: "",
                exactSoln: "",
                growthSupport: "",
                intelProp: "",
                prodMethod: "",
                salesVal: "",
                whoCustomers: ""
            }

        },
        organization : {
            status : 'pending',
            data : {

                boardGov: "",
                empTurnOver: "",
                havePartners: "",
                haveTeam: "",
                missionDrive: "",
                partner : {partner1 : {focus: '', name: '', duration: ''}},
                partnerPlan: "",
                team: { team1 : { name: '', response : '', role: ''}},
                uniqRevDiff: ""
            }

        },
        economics : {
            status : 'pending',
            data : {

                accPolicy: "",
                bankMoni: "N",
                costing: { costing1 : { cost: '', driver : ''}},
                grossProfitMargin: "",
                liabilities: "",
                unitEcon: "",
                valProp: "",
                valuation: "",
                year1assumption: "",
                year1gross: "",
                year2assumption: "",
                year2gross: "",
                year3assumption: "",
                year3gross: "",
            }

        },
        milestones : {
            status : 'pending',
            data : {
                custValEvidence: "",
                decrCACEvidence: "",
                min2Rev: "",
                scaleProd: "",
                trackSuccess: ""
                }

        }

    }});

    await updateUserApplication(userid, `LASRIC_${callid}_${userid}`, track, callid);
}

export const submitApplication = async (appid, callid, userid, track, firstname, lastname) => {

    //await setDoc(doc(db, "applications", userid), {...data.application.data, [page] : formData });

    const documentRef = doc(db, "applications", appid);
    await updateDoc(documentRef, { "submitted" : true });

    await updateCallupApplications(callid, `LASRIC_${callid}_${userid}`);
    await addToSubmitted(callid, userid, track, firstname, lastname);

}

const addToSubmitted = async (callid, userid, track, firstname, lastname) => {

    await setDoc(doc(db, "submittedApplications", `LASRIC_${callid}_${userid}`), {...data.application, firstname, lastname,  track, uid : userid , dateSubmitted : new Date, avgGrade : '0', gradedBy : [], status : 'pending'  } )


}

export const updateApplication = async (appid, formData) => {

    //await setDoc(doc(db, "applications", userid), {...data.application.data, [page] : formData });

    console.log(appid)

    const documentRef = doc(db, "applications", appid);
    await updateDoc(documentRef, { "data.vision.data" : formData });
    await updateDoc(documentRef, { "data.vision.status" : "completed" });

}

export const updateEconomicsApplication = async (appid, formData) => {

    //await setDoc(doc(db, "applications", userid), {...data.application.data, [page] : formData });

    console.log(appid)

    const documentRef = doc(db, "applications", appid);
    await updateDoc(documentRef, { "data.economics.data" : formData });
    await updateDoc(documentRef, { "data.economics.status" : "completed" });

}

export const updateMilestonesApplication = async (appid, formData) => {

    //await setDoc(doc(db, "applications", userid), {...data.application.data, [page] : formData });

    console.log(appid)

    const documentRef = doc(db, "applications", appid);
    await updateDoc(documentRef, { "data.milestones.data" : formData });
    await updateDoc(documentRef, { "data.milestones.status" : "completed" });

}

export const updateOrganizationApplication = async (appid, formData) => {

    //await setDoc(doc(db, "applications", userid), {...data.application.data, [page] : formData });

    console.log(appid)

    const documentRef = doc(db, "applications", appid);
    await updateDoc(documentRef, { "data.organization.data" : formData });
    await updateDoc(documentRef, { "data.organization.status" : "completed" });

}

export const updatePropositionApplication = async (appid, formData) => {

    //await setDoc(doc(db, "applications", userid), {...data.application.data, [page] : formData });

    console.log(appid)

    const documentRef = doc(db, "applications", appid);
    await updateDoc(documentRef, { "data.proposition.data" : formData });
    await updateDoc(documentRef, { "data.proposition.status" : "completed" });

}

export const updatePersonalApplication = async (appid, formData) => {

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


