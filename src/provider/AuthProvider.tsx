import { useState, useEffect, ReactNode } from "react";
import { auth, googleProvider, db } from "../config/firebase";
import { AuthContext } from "../contexts/AuthContext";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { signInWithPopup, signInWithRedirect, signInWithEmailAndPassword, signOut, onAuthStateChanged, getRedirectResult } from "firebase/auth";
import { User as FirebaseUser } from "firebase/auth"; // Import FirebaseUser type
import { User } from "../types/User"; // Import User type from the correct file
import { FirebaseError } from "firebase/app";

interface AuthProviderProps {
  children: ReactNode;
}

const getUserRole = async (user: FirebaseUser): Promise<string> => {
  if (!user.email) {
    throw new Error("User email is null");
  }
  const adminRef = doc(db, "admins", user.email);
  const adminDoc = await getDoc(adminRef);

  if (adminDoc.exists()) {
    const data = adminDoc.data();
    console.log("User role from Firestore:", data.role); // Log the role fetched from Firestore
    return data.role || "user";
  }
  return "user";
};

const getAdminRegion = async (user: FirebaseUser): Promise<string> => {
  const adminRef = doc(db, "admins", user.email || "");
  const adminDoc = await getDoc(adminRef);

  if (adminDoc.exists()) {
    const data = adminDoc.data();
    return data.region_id || "";
  } else {
    return "";
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const createUserIfNotExists = async (user: User) => {
    const adminRef = doc(db, "admins", user.email);
    const adminDoc = await getDoc(adminRef);

    if (!adminDoc.exists()) {
      await setDoc(adminRef, {
        email: user.email,
        role: "user",
        region_id: "stockholm"
      });
    } else {
      const data = adminDoc.data();
      if (data.role !== "admin") {
        await setDoc(adminRef, { role: "admin" }, { merge: true });
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          console.log("Auth state changed: User signed in:", user.email);
          const region = await getAdminRegion(user);
          const role = await getUserRole(user);
          const userData: User = { id: user.uid, email: user.email || "", role, region_id: region };
          setCurrentUser(userData);
          console.log("Auth state changed: Current user set:", userData);
        } catch (error) {
          console.error("Error fetching user role:", error);
          setCurrentUser(null);
        }
      } else {
        console.log("Auth state changed: User signed out");
        setCurrentUser(null);
      }
    });
  
    return () => unsubscribe();
  }, []);
  
  const signIn = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        console.error("Email or password is empty");
        return;
      }
      console.log("Attempting to sign in with email:", email);
      const credentials = await signInWithEmailAndPassword(auth, email, password); 
      const user = credentials.user;
      console.log("User signed in:", user.email);
      
      const region = await getAdminRegion(user);  
      const role = await getUserRole(user);  
      const userData: User = { id: user.uid, email: user.email || "", role, region_id: region };
      
      setCurrentUser(userData);
      console.log("Current user set:", userData);
    } catch (err) {
      console.error("Error during sign-in:", err);
      if ((err as FirebaseError).code === 'auth/invalid-credential') {
        console.error("Invalid credentials. Please check the email and password.");
      }
    }
  };
  
  const logOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      console.log("User signed out");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      let result;
      if (window.innerWidth > 768) {
        result = await signInWithPopup(auth, googleProvider);
      } else {
        result = await signInWithRedirect(auth, googleProvider);
      }

      if (result && result.user) {
        const user = result.user;
        const region = await getAdminRegion(user);
        const role = await getUserRole(user);
        const userData: User = { id: user.uid, email: user.email || "", role, region_id: region };
        setCurrentUser(userData);
        await createUserIfNotExists(userData);
      }

      const redirectResult = await getRedirectResult(auth);

      if (redirectResult && redirectResult.user) {
        const user = redirectResult.user;
        const region = await getAdminRegion(user);
        const role = await getUserRole(user);
        const userData: User = { id: user.uid, email: user.email || "", role, region_id: region };
        setCurrentUser(userData);
        await createUserIfNotExists(userData);
      }
    } catch (err) {
      console.error("Error signing in with Google:", err);
      alert("Error signing in. Please try again.");
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, signIn, logOut, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};
