import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store";
import { useLocation, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  return (
    <div>
      {pathname === "/login" ? (
        <Login />
      ) : pathname === "/register" ? (
        <Register />
      ) : (
        <div>
          <Link to="/register">Start Here</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
