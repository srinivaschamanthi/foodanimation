import swiggy from "../assets/swiggy.svg";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { useContext } from "react";
import { UseOnlineStatus } from "../utils/useOnlineStatus";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Tooltip from "@mui/material/Tooltip";
import HomeIcon from "@mui/icons-material/Home";

const Header = () => {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      // right: -3,
      // top: 3,
      // padding: "4px opx",
    },
  }));
  const cartItems = useSelector((store) => store.cart.items);
  const length = cartItems.reduce((acc, curr) => {
    acc = acc + curr.inStock;
    return acc;
  }, 0);
  const onlineStatus = UseOnlineStatus();
  const wifiStyle = {
    color: onlineStatus ? "#48c479" : "#db7c38",
  };
  const { loggedInUser } = useContext(UserContext);
  return (
    <div className="header">
      <Link to="/" className="linkStyle">
        <div className="logo-container">
          <img className="logo" src={swiggy} />
        </div>
      </Link>

      <div className="nav-items">
        <ul>
          <li>
            <Link to="/" className="linkStyle">
            <Tooltip title="Home">
                <IconButton>
                  <HomeIcon/>
                </IconButton>
              </Tooltip>
            </Link>
          </li>
          <li>
            <Link to="/about" className="linkStyle">
              {" "}
              <Tooltip title="About">
                <IconButton>
                  <AdminPanelSettingsIcon />
                </IconButton>
              </Tooltip>
            </Link>
          </li>
          {/* <li>
            <Link to="contact" className="linkStyle">
              Contact Us
            </Link>
          </li> */}
          <li>
            <Link to="/cart" className="linkStyle">
              <Tooltip title="Cart">
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={length} color="primary">
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
              </Tooltip>
            </Link>
          </li>
          <li>
            <IconButton>
              <Tooltip title="Internet connection">
                <i className="fa fa-wifi" style={wifiStyle}></i>
              </Tooltip>
            </IconButton>
          </li>
          {/* <li>{loggedInUser}</li> */}
        </ul>
      </div>
    </div>
  );
};

export default Header;
