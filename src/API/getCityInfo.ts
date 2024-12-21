import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../config/firebase.ts";
import {ICity} from "../types/City.ts";


export async function getCityInfo(cityName: string) {
    const citiesRef = collection(db, "cities");

    const q = query(citiesRef, where("name", "==", cityName));

    try {
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log('No matching documents found.');
            return;
        }

        const city = querySnapshot.docs[0];



        return {uid: city.id, ...querySnapshot.docs[0].data()} as ICity;
    } catch (error) {
        console.error('Error fetching city:', error);
    }
}
