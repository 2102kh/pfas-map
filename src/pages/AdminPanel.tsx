import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext"; 

export const AdminPanel = () => {
  const authContext = useContext(AuthContext);

  if (!authContext || !authContext.currentUser) {
    return <div>Loading...</div>;
  }

  const { currentUser } = authContext;

  console.log("Logged in user:", currentUser.email, "Role:", currentUser.role);

  // Kontrollera om användaren har en 'role' och om den är "admin"
  if (currentUser.role !== "admin") {  
    return <div>Access Denied: You must be an admin to access this page.</div>;
  }

  return (
    <div>
      <h1>Welcome, Admin!</h1>
    </div>
  );
};
