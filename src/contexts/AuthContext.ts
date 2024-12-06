import { createContext } from "react";
import { User } from "firebase/auth";


interface AuthContextType {
  currentUser: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}


export const AuthContext = createContext<AuthContextType | null>(null);
