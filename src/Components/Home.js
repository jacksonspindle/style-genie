import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store";
import { useLocation, Link, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { Canvas } from "@react-three/fiber";
// import Hoodie from "./HoodieOriginal";
import { OrbitControls } from "@react-three/drei";
import Shoe from "./Shoe";
import Hoodie from "./Hoodie";

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleClick = () => {
    if (auth.id) {
      navigate("/profile");
    } else {
      navigate("/register");
    }
  };

  useEffect(() => {
    document.title = "StyleGenie 🏠";
  }, []);

  return (
    <div>
      {pathname === "/login" ? (
        <Login />
      ) : pathname === "/register" ? (
        <Register />
      ) : (
        <div>
          {auth.id ? (
            ""
          ) : (
            <div className="hero-container">
              <div className="hero">
                <h1>Design Your Own Hoodie Using AI</h1>
                <Link to="/register" className="button-large">
                  Start Here
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="canvas">
        <Canvas>
          <Hoodie />
          <ambientLight />
          <directionalLight />
          <OrbitControls maxDistance={16} minDistance={9} enableZoom={false} />
        </Canvas>
      </div>
    </div>
  );
};

export default Home;
