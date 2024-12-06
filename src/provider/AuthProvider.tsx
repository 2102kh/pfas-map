import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut, User } from "firebase/auth";
import { useState, useEffect, ReactNode } from "react";
import { auth, googleProvider } from "../config/firebase";
import { AuthContext } from "../contexts/AuthContext";

interface AuthProviderProps {
    children: ReactNode;

}
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        })
        return () => unsubscribe();
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error("Error signing in:", err);
        }
    };
    const logOut = async () => {
        try {
            await signOut(auth);
            console.log("User signed out");
        } catch (err) {
            console.error(err);
            console.log("Error creating user");
        }
    };

    const signInWithGoogle = async () => {
        try {
            if (window.innerWidth > 768) {

                await signInWithPopup(auth, googleProvider);

            } else {
                await signInWithRedirect(auth, googleProvider);
            }
            console.log("User signed in");

        } catch (err) {
            console.error(err);
            console.log(err);
            alert("Error signing in. Please try again.")
        }

    };


    return (
        <>
            <AuthContext.Provider value={{ currentUser, signIn, logOut, signInWithGoogle }}>
                {children}
            </AuthContext.Provider>

        </>
    )
}