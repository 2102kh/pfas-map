import { useState } from "react";
import { createAdminAccount } from "../API/createAdminAccount.ts";
import "../styles/_createAccount.scss";



export const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await createAdminAccount(email, password, city);
      setMessage(response.message);
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
    <div className="create-account">
      <h2 className="create-account__title">Registrera ny admin</h2>
      <input
        className="create-account__input"
        type="email"
        placeholder="E-post"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="create-account__input"
        type="password"
        placeholder="Lösenord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="create-account__input"
        type="password"
        placeholder="Bekräfta Lösenord"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <input
        className="create-account__input"
        type="text"
        placeholder="Stad"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="create-account__button" onClick={handleRegister}>
        Registrera
      </button>
      <p className="create-account__message">{message}</p>
    </div>

  );
};

export default CreateAccount;
