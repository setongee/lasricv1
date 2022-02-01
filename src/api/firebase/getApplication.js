import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from "./config";

export const getApplication = async (appid) => {

    const docRef = doc(db, "applications", appid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

        return docSnap.data();

      } else {

        return null;

      }

}