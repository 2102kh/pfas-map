import { ICity } from "../types/City.ts";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.ts";

export const getAllCitiesInfo = async (): Promise<ICity[]> => {
  const citiesArray: ICity[] = [];
  const citiesCollection = collection(db, "cities");

  try {
    const citySnapshot = await getDocs(citiesCollection);
    citySnapshot.forEach((doc) => {
      const cityData = doc.data();
      citiesArray.push({
        uid: doc.id,
        ...cityData,
      } as ICity);
    });
  } catch (error) {
    console.error("Error retrieving cities: ", error);
  }

  return citiesArray;
};
