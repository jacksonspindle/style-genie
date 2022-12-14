import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../store";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    avatar: "",
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const registerUser = (ev) => {
    ev.preventDefault();
    dispatch(register(credentials, navigate));
    setCredentials({
      email: "",
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      avatar: "",
    });
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={registerUser}>
        <div>
          <span>
            <label htmlFor="firstName">First name *</label>
            <input type="text" name="firstName" onChange={onChange}></input>
          </span>
          <span>
            <label htmlFor="lastName">Last name *</label>
            <input type="text" name="lastName" onChange={onChange}></input>
          </span>
        </div>

        <label htmlFor="email">Email *</label>
        <input type="text" name="email" onChange={onChange}></input>
        <label htmlFor="username">Username *</label>
        <input type="text" name="username" onChange={onChange}></input>
        <label htmlFor="password">Password *</label>
        <input type="text" name="password" onChange={onChange}></input>
        <div>
          <span>
            <label htmlFor="avatar">Choose a profile picture</label>
            <input type="file" name="avatar" accept="image/*"></input>
          </span>
        </div>
        <button>Sign up</button>
      </form>

      <div>
        Already have an account? <Link to="/login">Sign In</Link>
      </div>
    </div>
  );
};

export default Register;
