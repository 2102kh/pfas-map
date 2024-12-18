
import { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            navigate("/superadmin")
            const user = userCredential.user;

            // Hämta rollen från Custom Claims
            const idTokenResult = await user.getIdTokenResult();
            const role = idTokenResult.claims.role;

            console.log("Användarroll:", role);

            if (role === "superadmin") {
                console.log("Välkommen Superadmin!");
                navigate("/superadmin");
            } else {
                setError("Du har inte behörighet som superadmin.");
            }
        } catch (err: any) {
            console.error("Fel vid inloggning:", err.message);
            setError("Fel vid inloggning. Kontrollera dina uppgifter.");
        }
    };

    return (
        <div className="login-container">
            <h2>Logga in</h2>
            <input
                type="email"
                placeholder="E-post"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Logga in</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="form-footer">
                <div className="form-footer">
                    <NavLink to="/superadmin" className="form-link">
                        Skapa ett konto för en Superadministratör
                    </NavLink>

                    <NavLink to="/create-account" className="form-link">
                        Är du länsstyrelse-administratör? Skapa konto här
                    </NavLink>
                </div>

            </div>

        </div>
    );
};

export default Login;


