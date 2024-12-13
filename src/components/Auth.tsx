import "../styles/_auth.scss";
import { useContext, useState, } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { currentUser, signIn, signInWithGoogle, logOut } = authContext;
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      console.log("Attempting to sign in with email:", email, "and password:", password);
      await signIn(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during handleSignIn:", error);
    }
  };

  const handleSignInWithGoogle = async () => {
    await signInWithGoogle();
    navigate("/dashboard");
  };

  return (
    <>
      <form
        className="form-container"
        onSubmit={(e) => {
          e.preventDefault();
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
          {currentUser ?
            <button type="button" onClick={logOut}>
              Logout
            </button>
            :
            <button type="button" onClick={handleSignIn}>
              Sign In
            </button>
          }

          <button className='google' type="button" onClick={handleSignInWithGoogle}
          >
            Sign In With Google
          </button>
          <div>
            <NavLink to="/create-account">Dont have an account? Create Account</NavLink>
          </div>
        </div>

      </form>
    </>
  );
};
