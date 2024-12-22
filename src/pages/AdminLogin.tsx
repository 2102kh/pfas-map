import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../config/firebase.ts";
import "../styles/_admin-login.scss";


export const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Login attempt:", { email, password });
    if (!email || !password) {
      setError("Fyll i alla fält.");
      return;
    }
    setLoading(true);
    setError("");

      try {

        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        const user = userCredential.user;

        // Hämta rollen från Custom Claims
        const idTokenResult = await user.getIdTokenResult(true);
        const role = idTokenResult.claims.role;

        console.log("Användarroll:", role);
        console.log("Välkommen Admin!");

        navigate("/dashboard");
      } catch (err: any) {
        console.error("Fel vid inloggning:", err.message);
        setError("Fel vid inloggning. Kontrollera dina uppgifter.");
      }

    
  };

  return (
    <div className="admin-login">
    <h2>Admin från länsstyrelse</h2>
    
      <input
        type="email"
        placeholder="E-post"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <button
        onClick={handleLogin}
        disabled={loading}
        className={`login-button ${loading ? "loading" : ""}`}
      >
        {loading ? "Ladda ner..." : "Logga in"}
      </button>
    </div>
  
  
  );
};

export default AdminLogin;
