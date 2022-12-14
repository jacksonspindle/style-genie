import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";

const Nav = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const handleMenuClick = (ev) => {
    if (ev.target.name === "logout") {
      dispatch(logout(navigate));
    } else {
      navigate(`/${ev.target.name}`);
    }

    toggleMenu();
  };

  return (
    <nav className="nav">
      <div>
        <Link className="logo-container" to="/">
          <img className="logo" src="../../static/styleGenie_icon.png"></img>
          StyleGenie
        </Link>
      </div>
      {auth.id ? (
        <div className="nav-right">
          <Link to="/create">Create</Link>
          <Link to="/profile">Profile</Link>
          <img
            src={auth.avatar ? auth.avatar : "../../static/user-solid.svg"}
            onClick={toggleMenu}
            className="nav-profile-icon"
          ></img>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}

      {menu ? (
        <div className="nav-menu">
          <Link to="/profile" name="profile" onClick={handleMenuClick}>
            Profile
          </Link>
          <Link to="/closet" name="closet" onClick={handleMenuClick}>
            Closet
          </Link>
          <Link to="/closet" name="orders" onClick={handleMenuClick}>
            Orders
          </Link>
          <Link to="/cart" name="cart" onClick={handleMenuClick}>
            Cart
          </Link>
          <button
            className="button-small"
            name="logout"
            onClick={handleMenuClick}
          >
            Logout
          </button>
        </div>
      ) : null}
    </nav>
  );
};

export default Nav;
