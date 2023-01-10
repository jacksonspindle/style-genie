const express = require("express");
const app = express.Router();
const { isLoggedIn } = require("./middleware");
const { User, Hoodie } = require("../db");

app.get("/", async (req, res, next) => {
  try {
    const user = req.user;
    res.send(await user.getCloset());
  } catch (ex) {
    next(ex);
  }
});

app.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    res.send(await Hoodie.create(req.body));
  } catch (ex) {
    next(ex);
    console.log(ex);
  }
});

module.exports = app;
