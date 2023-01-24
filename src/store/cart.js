import axios from "axios";

const cart = (state = { lineItems: [] }, action) => {
  if (action.type === "SET_CART") {
    return action.cart;
  }
  if (action.type === "ADD_CART") {
    return action.cart;
  }
  if (action.type === "REMOVE_CART") {
    return action.cart;
  }
  if (action.type === "DELETE_CART") {
    return action.cart;
  }
  return state;
};

export const fetchCart = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get("/api/orders/cart", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_CART", cart: response.data });
  };
};

export const addCart = (garment, quantity = 1) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.post("/api/orders/cart", {
        headers: {
          authorization: token,
        },
        garment,
        quantity,
        hoodieId: garment.id,
      });
      dispatch({
        type: "ADD_CART",
        cart: response.data,
        // hoodieId: garment.id,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

export const removeCart = (garment, quantity) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put("/api/orders/cart", {
      headers: {
        authorization: token,
      },
      garment,
      quantity,
    });
    dispatch({
      type: "REMOVE_CART",
      cart: response.data,
    });
  };
};

export const deleteCart = (garment, quantityToRemove) => {
  console.log(quantityToRemove);
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.put("/api/orders/cart", {
        headers: {
          authorization: token,
        },
        garment,
        quantityToRemove,
      });
      dispatch({ type: "DELETE_CART", cart: response.data });
      console.log("it worked!");
    } catch (ex) {
      console.log(ex);
      console.log("its broken...");
      console.log(garment);
    }
  };
};

export default cart;
