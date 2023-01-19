import axios from "axios";

const orders = (state = [], action) => {
  if (action.type === "SET_ORDERS") {
    return action.order;
  }
  if (action.type === "CREATE_ORDERS") {
    return [...state, action.order];
  }
  console.log(action);
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
    console.log(response);
    dispatch({ type: "SET_ORDERS", order: response.data });
  };
};

export const createOrder = (navigate) => {
  //   console.log(order);
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");

      const response = await axios.post("/api/orders/create", {
        headers: {
          authorization: token,
        },
      });
      const order = response.data;
      console.log("this order was created!");
      dispatch({ type: "CREATE_ORDERS", order });
      navigate("/orders");
    } catch (ex) {
      console.log(ex);
    }
  };
};

export default orders;
