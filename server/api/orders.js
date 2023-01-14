const express = require("express");
const app = express.Router();
const { User } = require("../db");

module.exports = app;

app.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.createOrder());
  } catch (ex) {
    next(ex);
  }
});

app.get("/cart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.getCart());
  } catch (ex) {
    next(ex);
  }
});

app.get("/orders", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.getOrders());
  } catch (ex) {
    next(ex);
  }
});

app.post("/cart", async (req, res, next) => {
  try {
    console.log(req.body.headers);
    const user = await User.findByToken(req.body.headers.authorization);
    res.send(
      await user.addToCart({
        garment: req.body.garment,
        quantity: req.body.quantity,
      })
    );
  } catch (ex) {
    next(ex);
    // console.log(res);
  }
});

app.put("/cart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.body.headers.authorization);
    res.send(
      await user.removeFromCart({
        garment: req.body.garment,
        quantityToRemove: req.body.quantity,
      })
    );
  } catch (ex) {
    next(ex);
  }
});

app.post("/create", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.body.headers.authorization);
    res.send(await user.createOrder());
  } catch (ex) {
    next(ex);
  }
});
