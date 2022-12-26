import React, { useEffect, useState } from "react";
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
  });

  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState({});

  useEffect(() => {
    if (file) {
      file.addEventListener("change", (ev) => {
        const fileData = ev.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(fileData);
        reader.addEventListener("load", () => {
          setAvatar(reader.result);
        });
        console.log(avatar);
      });
    }
  }, [file]);

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const registerUser = async (ev) => {
    ev.preventDefault();
    try {
      await dispatch(register({ ...credentials, avatar }, navigate));
      setCredentials({
        email: "",
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        avatar: "",
      });
      setAvatar("");
      setFile(null);
      setError({});
      console.log(error);
      console.log(errorMessages);
    } catch (err) {
      console.log(err);
      setError({ errors: err.response.data });
    }
  };

  let errorMessages = [];

  if (error.errors) {
    console.log(error);
    errorMessages = error.errors.map((err) => err.message);
    console.log(errorMessages);
  }

  return (
    <div className="register">
      <div className="register-form-container">
        <h1>Sign Up</h1>
        <form onSubmit={registerUser}>
          <div className="first-last-name-container">
            <span>
              <label htmlFor="firstName">First name *</label>
              <input
                className="register-input"
                type="text"
                name="firstName"
                onChange={onChange}
              ></input>
            </span>
            <span>
              <label htmlFor="lastName">Last name *</label>
              <input
                className="register-input"
                type="text"
                name="lastName"
                onChange={onChange}
              ></input>
            </span>
          </div>

          <label htmlFor="email">Email *</label>
          <input
            className="register-input"
            type="text"
            name="email"
            onChange={onChange}
          ></input>
          <label htmlFor="username">Username *</label>
          <input
            className="register-input"
            type="text"
            name="username"
            onChange={onChange}
          ></input>
          <label htmlFor="password">Password *</label>
          <input
            className="register-input"
            type="text"
            name="password"
            onChange={onChange}
          ></input>
          <div className="profile-upload-container">
            <span className="profile-upload">
              <label htmlFor="avatar">Choose a profile picture</label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                ref={(x) => setFile(x)}
              ></input>
            </span>
            {avatar ? (
              <img className="register-image" src={avatar} />
            ) : (
              <div></div>
            )}
          </div>

          <div className="button-container">
            <button className="button-large">Sign up</button>
          </div>
        </form>

        {errorMessages.length ? (
          <div className="error-container">
            <span>
              Could not register your new user! Please address these errors:
            </span>
            <ul>
              {errorMessages.map((msg) => {
                return (
                  <li className="register-error-message" key={msg}>
                    {msg}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        <div>
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
