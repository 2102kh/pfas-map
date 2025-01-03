import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { ClipLoader } from "react-spinners";
import "../styles/_superAdmin.scss";


interface Admin {
  id: string;
  role: string;
  email?: string;
  city?: string;
}

const SuperAdminPanel = () => {
  const [pendingAdmins, setPendingAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("Ingen användare är inloggad.");
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        const idTokenResult = await user.getIdTokenResult(true);
        const role = idTokenResult?.claims?.role;

        if (role !== "superadmin") {
          console.warn("Användaren är inte superadmin.");
          navigate("/login");
        } else {
          console.log("Superadmin är inloggad.");
          fetchPendingAdmins();
        }
      } catch (error) {
        console.error("Fel vid rollkontroll:", error);
        setError("Fel vid rollkontroll.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const checkSuperadminRole = () => {
    const auth = getAuth();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("Custom Claims:", idTokenResult.claims);

        if (idTokenResult.claims.role === "superadmin") {
          console.log("Användaren är superadmin!");
        } else {
          console.warn("Användaren har inte superadmin-roll.");
        }
      } else {
        console.error("Ingen användare är inloggad.");
      }
    });
  };

  useEffect(() => {
    checkSuperadminRole();
  }, []);
  const fetchPendingAdmins = async () => {
    try {
      const adminsQuery = query(collection(db, "admins"), where("role", "==", "pending"));
      const querySnapshot = await getDocs(adminsQuery);
      const adminsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, role: data.role, email: data.email, city: data.city };
      });
      setPendingAdmins(adminsData);
    } catch (err) {
      setError("Fel vid hämtning av administratörer.");
      console.error(err);
    }
  };
  if (loading) return <p>Laddar...</p>;
  if (error) return <p className="red-error">{error}</p>;
  const handleApprove = async (id: string) => {
    try {
      await updateDoc(doc(db, "admins", id), { role: "admin" });
      setPendingAdmins((prev) => prev.filter((admin) => admin.id !== id));
      alert("Admin godkänd!");
    } catch (error) {
      console.error("Fel vid godkännande av administratör:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "admins", id));
      setPendingAdmins((prev) => prev.filter((admin) => admin.id !== id));
      alert("Administratör borttagen!");
    } catch (error) {
      console.error("Fel vid borttagning av administratör:", error);
    }
  };

  if (loading) {
    <div className="spinner-container">
      <ClipLoader color="#3498db" size={50} />
      <p>Laddar...</p>
    </div>
  }

  return (
    <div className="superadmin-panel">
      <h2 className="superadmin-panel__title">Superadmin Kontrollpanel</h2>
      {pendingAdmins.length === 0 ? (
        <p className="superadmin-text">Inga administratörer väntar på godkännande.</p>
      ) : (
        <ul className="superadmin-panel__list">
          {pendingAdmins.map((admin) => (
            <li key={admin.id} className="superadmin-panel__list-item">
              <div className="superadmin-panel__list-details">
                <p>Email: <strong>{admin.email}</strong></p>
                <p>Ort: <strong>{admin.city}</strong></p>
              </div>
              <div className="superadmin-panel__list-buttons">
                <button
                  className="approve"
                  onClick={() => handleApprove(admin.id)}
                >
                  Godkänn
                </button>
                <button
                  className="reject"
                  onClick={() => handleDelete(admin.id)}
                >
                  Neka
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuperAdminPanel;


