import React, { useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import Login from "./Login";
import { loginWithToken } from "../store";
import Home from "./Home";
import { Link, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Profile from "./Profile";
import Nav from "./Nav";
import CreateHoodie from "./CreateHoodie";
import Closet from "./Closet";
import FAQ from "./FAQ";
import Cart from "./Cart";

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
      <div>
        <Nav />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="/register" element={<Home />} />
        <Route path="/create" element={<CreateHoodie />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/closet" element={<Closet />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </div>
  );
};

export default connect((state) => state)(App);
