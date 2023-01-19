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
      <div>
        {orders.map((order) => {
          return (
            <li key={order.id}>
              {order.id}
              <p>
                {order.lineItems.map((item) => {
                  return (
                    <span key={item.id}>
                      {item.hoodie.name}
                      <img src={item.hoodie.image}></img>
                    </span>
                  );
                })}
              </p>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
