/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const jwtAuthenticate = require("../../middlewares/auth");

const Controller = require("../../controllers/auth");
const {
  validateRegisterUser,
  validateLoginUser,
} = require("../../validation/users");

router.post("/logout", jwtAuthenticate, Controller.logout);
router.post("/signup", validateRegisterUser, Controller.register);
router.post("/login", validateLoginUser, Controller.login);

module.exports = router;
