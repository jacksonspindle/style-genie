import axios from "axios";
import { response } from "express";

const hoodies = (state = [], action) => {
  if (action.type === "SET_CLOSET") {
    return action.closet;
  }
};

export const getCloset = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");

    if (token) {
      const reponse = await axios.get("/api/hoodies", {
        headers: { authorization: token },
      });

      dispatch({ type: "SET_CLOSET", closet: response.data });
    }
  };
};

export const addToCloset = (hoodie) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");

    if (token) {
      const reponse = await axios.post("/api/hoodies", hoodie, {
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
