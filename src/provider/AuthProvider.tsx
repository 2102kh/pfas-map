// import { useState, useEffect, ReactNode } from "react";
// import { auth, db } from "../config/firebase";
// import { AuthContext } from "../contexts/AuthContext";
// import { getDoc, doc } from "firebase/firestore";
// import { signOut, onAuthStateChanged } from "firebase/auth";
// //import { User as FirebaseUser } from "firebase/auth";
// import { User } from "../types/User";

// interface AuthProviderProps {
//   children: ReactNode;
// }

// const getUserRoleAndCity = async (user: User): Promise<{ role: string; city: string }> => {
//   if (!user.email) {
//     throw new Error("User email is null");
//   }
//   const adminRef = doc(db, "admins", user.email);
//   const adminDoc = await getDoc(adminRef);

//   if (adminDoc.exists()) {
//     const data = adminDoc.data();
//     console.log("User data from Firestore:", data);
//     return {
//       role: data.role || "user",
//       city: data.city || "",
//     };
//   }
//   return { role: "user", city: "" };
// };

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [currentUser, setCurrentUser] = useState<User | null>(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         try {
//           console.log("User signed in:", user.email);

//           const idTokenResult = await user.getIdTokenResult();
//           console.log("Custom Claims:", idTokenResult.claims);

//           const { role, city } = await getUserRoleAndCity(user);
//           const userData: User = {
//             id: user.uid,
//             email: user.email || "",
//             role,
//             city,
//           };
//           setCurrentUser(userData);
//           console.log("Current user set:", userData);
//         } catch (error) {
//           console.error("Error fetching user role and city:", error);
//           setCurrentUser(null);
//         }
//       } else {
//         console.log("User signed out");
//         setCurrentUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const logOut = async () => {
//     try {
//       await signOut(auth);
//       setCurrentUser(null);
//       console.log("User signed out");
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ currentUser, logOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import { useState, useEffect, ReactNode } from "react";
import { auth, db } from "../config/firebase";
import { AuthContext } from "../contexts/AuthContext";
import { getDoc, doc } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { User as FirebaseUser } from "firebase/auth";

//import { User } from "../types/User";




interface AuthProviderProps {
  children: ReactNode;
}
type ExtendedUser = {
  id: string;
  email: string;
  role: string;
  city?: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  providerData: FirebaseUser["providerData"];
};



export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<ExtendedUser | null>(null);

  const fetchUserData = async (user: FirebaseUser | null): Promise<ExtendedUser | null> => {
    if (!user) return null;

    try {
      const idTokenResult = await user.getIdTokenResult(true);
      const role = typeof idTokenResult.claims.role === "string" ? idTokenResult.claims.role : "user";
      let city = "";

      console.log("fetchUserData", user);

      if (role !== "superadmin") {
        console.log(1)
        const adminDoc = await getDoc(doc(db, "admins", user.uid));
        console.log(2)

        if (adminDoc.exists()) {
          console.log("admindata", adminDoc.data());
          city = adminDoc.data().city || "";
        }
      }

      return {
        id: user.uid,
        email: user.email!,
        role,
        city,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        providerData: user.providerData,
      };
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await fetchUserData(user);
        setCurrentUser(userData);
        console.log("Current user set:", userData);
      } else {
        setCurrentUser(null);
        console.log("No user signed in.");
      }
    });

    return () => unsubscribe();
  }, []);

  const logOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};



