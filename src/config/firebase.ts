
import { initializeApp } from "firebase/app";
//import { Analytics, getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
interface PFASInfo {
  name: string;
  pfasLevel: number;
  update: Date;
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
//const analytics = getAnalytics(app);

export const savePFASData = async (city: string, pfasInfo: PFASInfo) => {
  const cityDocRef = doc(collection(db, "cities"), city);
  await setDoc(cityDocRef, pfasInfo);
};

export default app;