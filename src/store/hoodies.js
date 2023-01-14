import axios from "axios";

const hoodies = (state = [], action) => {
  if (action.type === "SET_CLOSET") {
    return action.closet;
  }
  if (action.type === "ADD_TO_CLOSET") {
    return [...state, action.hoodie];
  }

  return state;
};

export const getCloset = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get("/api/hoodies", {
          headers: { authorization: token },
        });

        dispatch({ type: "SET_CLOSET", closet: response.data });
      } catch (ex) {
        console.log(ex);
      }
    }
  };
};

export const addToCloset = (hoodie) => {
  return async (dispatch) => {
    // console.log("getCloset function dispatched");

    const token = window.localStorage.getItem("token");

    if (token) {
      const response = await axios.post("/api/hoodies", hoodie, {
        headers: { authorization: token },
      });

      dispatch({
        type: "ADD_TO_CLOSET",
        hoodie: response.data,
      });
    }
  };
};

export default hoodies;
