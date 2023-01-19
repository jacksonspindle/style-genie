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

    // const response = axios.get("./api/payment/config").then(async (r) => {
    //   console.log(r);
    //   const { publishableKey } = await r.json();

    //   console.log(publishableKey);
    //   console.log("test");
    //   return publishableKey;
    // });
    // console.log(response);
  }, []);

  //   console.log(cart);

  //   const removeImageKeys = (obj) => {
  //     const keys = Object.keys(obj);
  //     const filteredKeys = keys.filter((key) => key !== "image");
  //     return filteredKeys.reduce((acc, key) => {
  //       acc[key] = obj[key];
  //       return acc;
  //     }, {});
  //   };

  const itemMetaData = cart.lineItems.map((order) => {
    // const item = Object.assign({}, order.hoodie);
    // console.log(item);
    delete order.hoodie.image;
    delete order.hoodie.createdAt;
    delete order.hoodie.updatedAt;
    delete order.hoodie.id;
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
    delete order.totalPrice;
    delete order.hoodieId;

    // console.log(order);
    return order;
  });

  const metadata = Object.assign({}, itemMetaData);
  console.log(metadata);

  // const itemMetaData = { ...cart, ...obj2, ...obj3 };
  //   const cartDetails = removeImageKeys(cart);
  //   console.log(cartDetails);
  const orderDetails = { items: JSON.stringify(metadata), total: "100" };
  // const orderDetails = "test order details";
  const amount = 100;
  //   useEffect(() => {
  //     fetch("/api/payment/create-payment-intent", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         metadata: orderDetails,
  //         amount: amount,
  //       }),
  //     }).then(async (r) => {
  //       const { clientSecret } = await r.json();
  //       console.log(clientSecret);
  //       setClientSecret(clientSecret);
  //     });
  //   }, []);

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
      Payment
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <Checkout />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
