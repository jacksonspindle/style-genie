import axios from "axios";

const auth = (state = {}, action) => {
  if (action.type === "SET_AUTH") {
    return action.auth;
  }
  return state;
};

export const loginWithToken = () => {
  console.log("test");
  return async (dispatch) => {
    console.log("test2");
    const token = window.localStorage.getItem("token");
    console.log(token);
    if (token) {
      console.log("token test");
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });

      console.log("token test 2");

      dispatch({ type: "SET_AUTH", auth: response.data });
    }
  };
};

export const attemptLogin = (credentials) => {
  return async (dispatch) => {
    const response = await axios.post("/api/auth", credentials);
    window.localStorage.setItem("token", response.data);
    // console.log(response);
    dispatch(loginWithToken());
  };
};

export default auth;
