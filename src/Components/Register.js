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
    } catch (ex) {
      console.log(ex);
    }
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
            <input
              type="file"
              name="avatar"
              accept="image/*"
              ref={(x) => setFile(x)}
            ></input>
          </span>
          {avatar ? <img src={avatar} /> : <div></div>}
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
