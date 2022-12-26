import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateAuth } from "../store";
import Hoodie from "./Hoodie";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

const Profile = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [accountInfo, setAccountInfo] = useState({
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    avatar: "",
  });

  const [file, setFile] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (file) {
      file.addEventListener("change", (e) => {
        const fileData = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(fileData);
        reader.addEventListener("load", () => {
          setAccountInfo({ ...accountInfo, avatar: reader.result });
        });
      });
    }
  }, [file]);

  const onChange = (ev) => {
    setAccountInfo({ ...accountInfo, [ev.target.name]: ev.target.value });
  };

  const save = async (e) => {
    // e.preventDefault();
    try {
      await dispatch(updateAuth({ ...accountInfo, id: auth.id }));
      setAccountInfo({ ...accountInfo, password: "" });
      setEditing(false);
      console.log("edited");
    } catch (ex) {
      // setError({ errors: ex.response.data });
      console.log(ex);
    }
  };

  const cancel = () => {
    setEditing(false);
    setAccountInfo({
      ...accountInfo,
      email: auth.email,
      firstName: auth.firstName,
      lastName: auth.lastName,
      username: auth.username,
      avatar: auth.avatar,
    });
  };

  return (
    <div>
      {editing ? (
        <div className="edit-profile-form-container">
          <form className="edit-profile-form" onSubmit={save}>
            <section className="display-flex">
              <label htmlFor="avatar" className="profile-image-input-container">
                <img
                  src={
                    auth.avatar && !accountInfo.avatar
                      ? auth.avatar
                      : accountInfo.avatar
                      ? accountInfo.avatar
                      : "../../static/default-image.png"
                  }
                />
                <span style={{ cursor: "pointer" }}>
                  Change profile picture
                </span>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  ref={(x) => setFile(x)}
                  style={{ display: "none" }}
                ></input>
              </label>
            </section>

            <section className="display-flex">
              <div className="firstName-lastName-input-container">
                <span className="display-flex">
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={accountInfo.firstName}
                    name="firstName"
                    onChange={onChange}
                  ></input>
                </span>
                <span className="display-flex">
                  <label htmlFor="firstName">Last name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={accountInfo.lastName}
                    name="lastName"
                    onChange={onChange}
                  ></input>
                </span>
              </div>

              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={accountInfo.email}
                name="email"
                onChange={onChange}
              ></input>

              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={accountInfo.username}
                name="username"
                onChange={onChange}
              ></input>

              <label htmlFor="password">Password *</label>
              <input
                type="text"
                id="password"
                value={accountInfo.password}
                name="password"
                onChange={onChange}
                placeholder="Type your old password to confirm or a new password to change"
                required
              ></input>

              <div className="edit-profile-button-container">
                <button className="button-small" onClick={cancel}>
                  Cancel
                </button>
                <button
                  className="button-small"
                  onClick={save}
                  disabled={accountInfo.password === "" ? true : false}
                >
                  Save
                </button>
              </div>
            </section>
          </form>
        </div>
      ) : (
        <div className="profile">
          <div className="profile-container">
            <div className="profile-image-container">
              <img
                src={
                  auth.avatar ? auth.avatar : "../../static/default-image.png"
                }
              ></img>
            </div>
            <div className="profile-content-container">
              <h1>
                👋 Hi, {auth.firstName} {auth.lastName}!
              </h1>
              <div> ✉️ {auth.email} </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </div>
            </div>
          </div>
        </div>
      )}

      <Canvas>
        <mesh>
          <Hoodie />
          <ambientLight />
          <OrbitControls maxDistance={16} minDistance={9} enableZoom={false} />
        </mesh>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default Profile;
