
import {doc, updateDoc, Timestamp } from "firebase/firestore";
import {db} from "../config/firebase.ts";

export async function editCityInfo(cityId: string, newpfasLevel: string) {
    const ref = doc(db, 'cities', cityId);

    return await updateDoc(ref, {
        pfasData: newpfasLevel,
        lastUpdate: Timestamp.now(),
    });
}
