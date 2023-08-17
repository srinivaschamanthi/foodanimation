import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="linkStyle">
        <div className="logo-container">
          <img className="logo" src={LOGO_URL} />
          <br></br>
          <span className="styled-slogan-text">
            Elevate Your Taste, Sky High!
          </span>
        </div>
      </Link>
     
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/" className="linkStyle">
              Home
            </Link>
          </li>
          <li>
            <Link to="about" className="linkStyle">
              {" "}
              About Us
            </Link>
          </li>
          <li>
            <Link to="contact" className="linkStyle">
              Contact Us
            </Link>
          </li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
