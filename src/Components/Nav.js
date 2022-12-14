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
    <div>
      <Link to="/">StyleGenie</Link>

      {auth.id ? (
        <div>
          <Link to="/create">Create</Link>
          <Link to="/profile">Profile</Link>
          <img
            src={auth.avatar ? auth.avatar : "no profile"}
            onClick={toggleMenu}
          ></img>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}

      {menu ? (
        <div>
          <Link to="/designs" name="designs" onClick={handleMenuClick}>
            {auth.firstName}'s designs
          </Link>
          <Link to="/cart" name="cart" onClick={handleMenuClick}>
            Cart
          </Link>
          <Link to="/profile" name="profile" onClick={handleMenuClick}>
            Profile
          </Link>
          <button name="logout" onClick={handleMenuClick}>
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Nav;
