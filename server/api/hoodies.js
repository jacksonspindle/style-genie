const express = require("express");
const app = express.Router();
const { isLoggedIn } = require("./middleware");
const { User, Hoodie } = require("../db");

app.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    res.send(await user.getCloset());
    console.log(req.user);
  } catch (ex) {
    res.status(500).send({ error: "Error getting user closet" });
    next(ex);
    console.log(ex);
  }
});

app.post("/", isLoggedIn, async (req, res, next) => {
  try {
    console.log(req.body);
    res.send(await Hoodie.create(req.body));
  } catch (ex) {
    next(ex);
    console.log(ex);
  }
});

module.exports = app;
