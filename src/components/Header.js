import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { useContext } from "react";
import {UseOnlineStatus} from '../utils/useOnlineStatus'

const Header = () => {
  const onlineStatus = UseOnlineStatus();
  const wifiStyle = {
    color: onlineStatus ? "#48c479" : "#db7c38",
  };
  const {loggedInUser} = useContext(UserContext)
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
              About us
            </Link>
          </li>
          {/* <li>
            <Link to="contact" className="linkStyle">
              Contact Us
            </Link>
          </li> */}
          <li>Cart</li>
          <li>
        <i className="fa fa-wifi" style={wifiStyle}></i>

          </li>
          {/* <li>{loggedInUser}</li> */}

        </ul>
      </div>
    </div>
  );
};

export default Header;
