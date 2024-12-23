
import "../styles/_footer.scss";
import cleanpfasLogo from "../assets/cleanpfasLogo.png";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src={cleanpfasLogo} alt="CleanPFAS Logo" />
      </div>

      <div className="footer__container">
        <div className="footer__social">
          <a
            href="https://x.com/cleanpfasorg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com/cleanpfas"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.linkedin.com/company/cleanpfas"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
        <div className="superadmin-login">
          <NavLink to="/login-superadmin"><h2>Superadmin</h2></NavLink>
        </div>
      </div>
      <div className="footer__contact">
        <h3>Kontakt</h3>
        <p>Adress</p>
        <p>CleanPFAS AB</p>
        <p>Loremvägen 12</p>
        <p>123 45 Loremstad</p>
        <p>
          Mejladress: <a href="mailto:info@loremipsum.se">info@loremipsum.se</a>
        </p>
        <p>Telefon: 010-000 00 00</p>
      </div>
      <div className="footer__links">
        <h3>Länkar</h3>
        <ul>
          <li>
            <a href="#">Om oss</a>
          </li>
          <li>
            <a href="#">Shop</a>
          </li>
          <li>
            <a href="#">Bli medlem</a>
          </li>
          <li>
            <a href="#">Vanliga frågor</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
