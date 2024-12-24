import { useEffect, useState } from "react";
import { createAdminAccount } from "../API/createAdminAccount.ts";
import "../styles/_createAccount.scss";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.ts";

export const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState(""); // För länsstyrelseval
  const [message, setMessage] = useState("");
  const [cities, setCities] = useState<string[]>([]); // För att lagra hämtade länsstyrelser

  
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesCollection = collection(db, "cities"); // Antar att samlingen heter "cities"
        const snapshot = await getDocs(citiesCollection);
        const cityNames = snapshot.docs.map((doc) => doc.data().name); // Antar att dokumenten har ett fält "name"
        setCities(cityNames);
      } catch (error) {
        console.error("Fel vid hämtning av länsstyrelser:", error);
      }
    };

    fetchCities();
  }, []);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setMessage("Lösenordet matchar inte.");
      return;
    }

    if (!city) {
      setMessage("Vänligen välj en länsstyrelse.");
      return;
    }

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
      <select
        className="create-account__select"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      >
        <option value="" disabled>
          Välj länsstyrelse
        </option>
        {cities.length === 0 ? (
          <option>Laddar länsstyrelser...</option>
        ) : (
          cities.map((region, index) => (
            <option key={index} value={region}>
              {region}
            </option>
          ))
        )}
      </select>
      <button className="create-account__button" onClick={handleRegister}>
        Registrera
      </button>
      <p className="create-account__message">{message}</p>
    </div>
  );
};

export default CreateAccount;
