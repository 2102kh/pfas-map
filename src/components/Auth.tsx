import "../styles/_auth.scss";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/home");
      console.log("User created");
    } catch (err) {
      console.error(err);
      console.log("Error creating user");
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("User created");
    } catch (err) {
      console.error(err);
      console.log("Error creating user");
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

  return (
    <>
      <form className="form-container" onSubmit={(e) => e.preventDefault()}>
        <div className="user-box">
         
          <input
            placeholder="Your email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Your password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <button type="button" onClick={signIn}>
            Sign In
          </button>
          <button className='google' type="button" onClick={signInWithGoogle}
           >
            Sign In With Google
          </button>
          <button type="button" onClick={logOut}>
            Logout
          </button>
        </div>
      </form>
    </>
  );
};
