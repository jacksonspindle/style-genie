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

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchCart());
    dispatch(getCloset());
  }, []);

  useEffect(() => {
    dispatch(getCloset());
  }, [orders]);

  const handleSubmit = async (e) => {
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
      direct: "if_required",
    });

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

  const addOrder = () => {
    const order = {
      items: cart.lineItems.map((item) => item.id),
    };
    dispatch(createOrder(navigate));
  };

  return cart ? (
    <div>
      Checkout
      {/* {orders.map((order) => {
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
      })} */}
      {/* {cart.lineItems.map((item) => {
        console.log(cart);
        const cartImages = hoodies.find((hoodie) => hoodie.name === cart);
        return (
          <li key={item.hoodie.id}>
            {item.hoodie.name}
            <img src={item.hoodie.image}></img>
          </li>
        );
      })} */}
      <div className="payment-form-container">
        <form id={"payment-form"} onSubmit={handleSubmit}>
          <h1>Payment Form</h1>
          <PaymentElement />
          <button
            className="button-large"
            disabled={isProcessing}
            onClick={addOrder}
          >
            <span id="button-text">
              {isProcessing ? "Processing..." : "Pay now"}
            </span>
          </button>
          {message && <div id="payment-message">{message}</div>}
        </form>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Checkout;
