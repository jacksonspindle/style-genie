const e = require("express");
const express = require("express");
const app = express.Router();
const { resolve } = require("path");
module.exports = app;

const env = require("dotenv").config({ path: "./.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

app.use(express.static(process.env.STATIC_DIR));

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

app.get("/config", (req, res) => {
  try {
    res.send({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
    console.log(process.env.STRIPE_PUBLISHABLE_KEY);
  } catch (ex) {
    console.log(ex);
  }
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "eur",
      amount: 1999,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (ex) {
    console.log(ex);
    return res.status(400).send({
      error: {
        message: ex.message,
      },
    });
  }
});

// app.get("/payment-completion", (req, res, next) => {
//   try {
//     res.send(req);
//   } catch (ex) {
//     next(ex);
//   }
// });