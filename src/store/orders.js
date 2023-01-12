import axios from "axios";

const orders = (state = [], action) => {
  if (action.type === "SET_ORDERS") {
    return action.orders;
  }
  if (action.type === "CREATE_ORDERS") {
    return [...state, action.order];
  }
  return state;
};

export const fetchOrders = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get("/api/orders/orders", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_ORDERS", orders: response.data });
  };
};

export const createOrder = (navigate) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.post("/api/orders/create", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "CREATE_ORDER", order: response.data });
  };
};

export default orders;
