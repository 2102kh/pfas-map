import { useState } from "react";
import axios from "axios";



export const CreateAccount= () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register-admin", {
        email,
        password,
        city,
      });
      setMessage(response.data.message);
    } catch (error: any) {
      if (error.response) {
        setMessage(`Fel: ${error.response.data.error}`);
      } else {
        setMessage("Ett oväntat fel uppstod. Kontrollera backend-servern.");
        console.error("Fel vid registrering:", error.message);
      }
    }
  };

  return (
    <div>
      <h2>Registrera ny admin</h2>
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
      <input
        type="password"
        placeholder="Bekräfta Lösenord"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Stad"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleRegister}>Registrera</button>
      <p>{message}</p>
      
    </div>
  );
};

export default CreateAccount;
