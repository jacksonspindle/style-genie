import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Checkout from "./Checkout";
import { Elements } from "@stripe/react-stripe-js";
import { fetchCart } from "../store";
import { useSelector, useDispatch } from "react-redux";

const Payment = (props) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetchCart();
  });

  useEffect(() => {
    fetch("/api/payment/config").then(async (r) => {
      const { publishableKey } = await r.json();
      console.log(publishableKey);
      console.log(r);

      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  const itemMetaData = cart.lineItems.map((order) => {
    delete order.hoodie.image;
    delete order.hoodie.createdAt;
    delete order.hoodie.updatedAt;
    delete order.hoodie.id;
    delete order.hoodie.userId;
    delete order.hoodie.price;
    delete order.hoodie.size;
    delete order.updatedAt;
    delete order.id;
    delete order.createdAt;
    delete order.hoodie.bodyColor;
    delete order.orderId;
    delete order.quantity;
    delete order.userId;
    delete order.userId;
    // delete order.totalPrice;
    delete order.hoodieId;

    return order;
  });

  const metadata = Object.assign({}, itemMetaData);

  const orderDetails = {
    items: JSON.stringify(metadata),
    total: itemMetaData.reduce((acc, curr) => acc + curr.totalPrice, 0) * 100,
  };
  const amount = orderDetails.total;

  useEffect(() => {
    axios
      .post("/api/payment/create-payment-intent", {
        metadata: { orderDetails },
        amount: amount,
      })
      .then((response) => {
        const { clientSecret } = response.data;
        console.log(clientSecret);
        setClientSecret(clientSecret);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <Checkout />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
