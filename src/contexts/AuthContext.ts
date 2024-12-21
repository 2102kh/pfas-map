import { createContext } from "react";
import { User } from "../types/User";


interface AuthContextType {
  currentUser: User | null;
  logOut: () => Promise<void>;
}




export const AuthContext = createContext<AuthContextType | null>(null);