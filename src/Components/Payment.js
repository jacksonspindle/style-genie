import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Checkout from "./Checkout";
import { Elements } from "@stripe/react-stripe-js";

const Payment = (props) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

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

  useEffect(() => {
    fetch("/api/payment/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (r) => {
      const { clientSecret } = await r.json();
      console.log(clientSecret);
      setClientSecret(clientSecret);
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
