import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Welcome {auth.username}</h1>
      <button>Logout</button>
    </div>
  );
};

export default Home;
