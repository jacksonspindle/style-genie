import React, { useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import Login from "./Login";
import { loginWithToken } from "../store";
import Home from "./Home";
import { Link, Routes, Route } from "react-router-dom";
import Register from "./Register";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  useEffect(() => {
    if (auth.id) {
      //   dispatch(fetchCart());
    }
  }, [auth]);

  console.log(auth.id);
  return (
    <div>
      {/* <h1>APP</h1>
      {auth.id ? (
        <Home />
      ) : (
        <div>
          <Register />
        </div>
      )} */}
      {/* {!!auth.id && ( */}
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/profile">Profile</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Home />} />
          <Route path="/register" element={<Home />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </div>
      {/* )} */}
    </div>
  );
};

export default connect((state) => state)(App);
