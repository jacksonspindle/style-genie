import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { attemptLogin } from "../store/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = (ev) => {
    console.log(credentials);
    ev.preventDefault();
    dispatch(attemptLogin(credentials, navigate));
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
        <input
          placeholder="username"
          name="username"
          //   value={credentials.username}
          onChange={onChange}
        ></input>
        <input
          placeholder="password"
          name="password"
          //   value={credentials.password}
          onChange={onChange}
        ></input>
        <button>Login</button>
      </form>
      <h3>
        Don't have an account? <Link to="/register">Register Here</Link>
      </h3>
    </div>
  );
};

export default Login;
