import { useContext, useState } from "react";
import { CgClose } from "react-icons/cg";
import { RiMenu2Line } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/_navBar.scss";
import { AuthContext } from "../contexts/AuthContext";
import cleanPfasLogo from "../assets/CleanLogoTrans.png";

export const NavBar = () => {
  const [isResponsive, setIsResponsive] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsResponsive(!isResponsive);
  };
  const closeNavbar = () => {
    setIsResponsive(false);
  };
  const handleLogOut = async () => {
    try {
      await logOut(); 
      navigate("/");
      closeNavbar(); 
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };

  const context = useContext(AuthContext);

if (!context) {
  throw new Error("AuthContext must be used within an AuthProvider");
}

const { currentUser, logOut } = context;

  return (
    <>
    <div className="logo">
      <img src={cleanPfasLogo} alt="cleanPfas logo" />
    </div>
      <nav className={isResponsive ? "responsive_nav" : ""}>
        <ul className="menu-list">
          <li>
            <NavLink to="/" onClick={closeNavbar}>
              Hem
            </NavLink>
          </li>
          <li>
            <NavLink to="/faq" onClick={closeNavbar}>
              FAQ
            </NavLink>
          </li>
         
          {currentUser ? (
    <li>
      <button onClick={handleLogOut} className="logout-btn">
        Logga ut
      </button>
    </li>
  ) : (
    <li>
  <NavLink to="/admin-login" onClick={closeNavbar} className="login-btn">
  Administrera PFAS mätningar 
  </NavLink>
</li>

  )}
        </ul>
        <button
          type="button"
          className="nav-btn nav-close-btn"
          aria-label="Close Menu"
          onClick={toggleNavbar}
        >
          <CgClose />
        </button>
      </nav>
      <button
        type="button"
        className="nav-btn nav-open-btn"
        aria-label="Open Menu"
        onClick={toggleNavbar}
      >
        <RiMenu2Line />
      </button>
    </>
  );
};
