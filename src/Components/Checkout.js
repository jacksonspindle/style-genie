import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../store";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

const Checkout = () => {
  const { cart } = useSelector((state) => state);
  const { hoodies } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    console.log(elements);

    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/#/payment-completion`,
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "suceeded") {
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

  return cart ? (
    <div>
      Checkout
      <form id={"payment-form"} onSubmit={handleSubmit}>
        <h1>Payment Form</h1>
        <PaymentElement />
        <button disabled={isProcessing}>
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
