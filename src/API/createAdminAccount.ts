import {auth, db} from "../config/firebase.ts";
import {
    createUserWithEmailAndPassword,
} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";

export async function createAdminAccount(email: string, password: string, city: string) {

    const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
    );

    await setDoc(doc(db, "admins", response.user.uid), {
        role: "pending",
        city,
        email,
    });



    return {message: `Admin registrerad med status "pending": ${email}`};

}
