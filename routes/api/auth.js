/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const Controller = require("../../controllers/auth");

// router.get("/logout", Controller.logout);
router.post("/register", Controller.register);
router.post("/login", Controller.login);

module.exports = router;
