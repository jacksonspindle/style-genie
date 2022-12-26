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

  const [error, setError] = useState(null);

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = async (ev) => {
    ev.preventDefault();
    const response = await dispatch(attemptLogin(credentials, navigate));
    console.log(response);
    if (
      response &&
      (response.errors === "bad credentials" ||
        response.errors === "user not found")
    ) {
      setError("Incorrect email or password. Please try again.");
    }
  };
  return (
    <div className="login">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={login}>
          <input
            className="login-input"
            placeholder="username"
            name="username"
            //   value={credentials.username}
            onChange={onChange}
          ></input>
          <input
            className="login-input"
            placeholder="password"
            name="password"
            //   value={credentials.password}
            onChange={onChange}
          ></input>

          <div className="login-button-container">
            <button onClick={login} className="button-large">
              Login
            </button>
          </div>
        </form>
        <div className="login-error-container">
          {error ? <div className="login-error">{error}</div> : null}
        </div>
        <h3 className="dont-have-an-account">
          Don't have an account? <Link to="/register">Register Here</Link>
        </h3>
      </div>
    </div>
  );
};

export default Login;
