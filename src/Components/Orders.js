import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../store";

const Orders = () => {
  const { orders } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <div>
      Orders
      <div className="orders-container">
        {orders.map((order) => {
          return (
            <li key={order.id} className="order">
              <p className="order-id"> {order.id}</p>
              <div className="order-details">
                {order.lineItems.map((item) => {
                  return (
                    <span key={item.id}>
                      {/* {item.hoodie.name} */}
                      <img src={item.hoodie.image}></img>
                    </span>
                  );
                })}
              </div>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
