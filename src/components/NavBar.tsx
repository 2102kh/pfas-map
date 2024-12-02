import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { RiMenu2Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import "../styles/_navBar.scss";

export const NavBar = () => {
  const [isResponsive, setIsResponsive] = useState(false);

  const toggleNavbar = () => {
    console.log("Before:", isResponsive);
    setIsResponsive(!isResponsive);
    console.log("After:", !isResponsive);
  };
  const closeNavbar = () => {
    setIsResponsive(false);
  };

  return (
    <>
      <nav className={isResponsive ? "responsive_nav" : ""}>
        <ul className="menu-list">
          <li>
            <NavLink to="/" onClick={closeNavbar}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/faq" onClick={closeNavbar}>
              FAQ
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={closeNavbar}>
              Contact
            </NavLink>
          </li>
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
