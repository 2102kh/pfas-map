import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";



export const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const createAccount = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/dashboard")
      } catch (err) {
        console.error(err);
      }
  }
    return (
      <>
        <form
          className="form-container"
          onSubmit={(e) => {
            e.preventDefault()

          }}>
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
            <input
              placeholder="Your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="confirmPassword"
            />


            <button type="button" onClick={createAccount}>
              Create Account
            </button>



          </div>
        </form>
      </>
    );
  };



