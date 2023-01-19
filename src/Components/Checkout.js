import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, fetchOrders, getCloset } from "../store";
import { createOrder } from "../store";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";

const Checkout = () => {
  const { cart, orders } = useSelector((state) => state);
  const { hoodies } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  console.log(cart);
  //   console.log(cart.lineItems.map((item) => item.id));

  //   const order = orders.find(order => order.id )

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchCart());
    console.log("test");
  }, []);

  useEffect(() => {
    dispatch(getCloset());
  }, [orders]);

  const handleSubmit = async (e) => {
    console.log(elements);

    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const orderDetails = { items: cart.lineItems, total: 100 };
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/#/payment-completion`,
      },
      //   metadata: { orderDetails },
      //   amount: 100,
      //   redirect: "if_required",
    });

    // const { error, paymentIntent } = axios
    //   .post("/create-payment-intent", {
    //     amount: 100,
    //     orderDetails,
    //   })
    //   .then((response) => {
    //     const { clientSecret } = response.data;
    //     stripe.confirmPayment(clientSecret, {
    //       elements,
    //       confirmParams: {
    //         return_url: `${window.location.origin}/#/payment-completion`,
    //       },
    //       metadata: { orderDetails },
    //       amount: 100,
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log(paymentIntent);
      setMessage("Payment status: " + paymentIntent.status);
    } else {
      setMessage("Unexpected state");
    }

    setIsProcessing(false);
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  //   useEffect(() => {
  //     dispatch(fetchGarments());
  //   }, []);

  const addOrder = () => {
    const order = {
      items: cart.lineItems.map((item) => item.id),
    };
    dispatch(createOrder(navigate));
  };

  return cart ? (
    <div>
      Checkout
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
      <form id={"payment-form"} onSubmit={handleSubmit}>
        <h1>Payment Form</h1>
        <PaymentElement />
        <button disabled={isProcessing} onClick={addOrder}>
          <span id="button-text">
            {isProcessing ? "Processing..." : "Pay now"}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  ) : (
    ""
  );
};

export default Checkout;
