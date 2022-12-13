import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { attemptLogin } from "../store/auth";

const Login = () => {
  const dispatch = useDispatch();
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
    dispatch(attemptLogin(credentials));
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
    </div>
  );
};

export default Login;
