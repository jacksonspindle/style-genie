import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../store";

const Register = () => {
  const dispatch = useDispatch;
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const _register = (ev) => {
    ev.preventDefault();
    dispatch(registerUser(credentials));
  };
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={_register}>
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
        <button>Register</button>
      </form>
      <h3>
        Already have an account? <Link to="/login">Login Here</Link>
      </h3>
    </div>
  );
};

export default Register;
