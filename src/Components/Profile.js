import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(auth);
  }, []);
  return (
    <div>
      <h1>Profile</h1>
      <h2>{auth.id ? `Welcome ${auth.username}!` : `not signed in`}</h2>
    </div>
  );
};

export default Profile;
