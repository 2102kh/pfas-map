import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../config/firebase.ts";


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
    <div>
      <h1>Admin från länsstyrelse</h1>
      <div style={{ maxWidth: "300px", margin: "0 auto", flex: "1", display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="email"
          placeholder="email"
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
    </div>
  );
};

export default AdminLogin;
