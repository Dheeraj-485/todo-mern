const express = require("express");
const { createUser, loginUser, checkUser } = require("../controller/User");
const isAuth = require("../middlewares/checkAuth");
const router = express.Router();

router
  .post("/signup", createUser)
  .post("/login", loginUser)
  .get("/own", isAuth, checkUser);
module.exports = router;
