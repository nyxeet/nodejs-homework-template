const { HttpCode } = require("../helpers/constants");
const Services = require("../services/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await Services.getOne({ email });

    if (result) {
      res.status(409).json({
        status: "success",
        code: 409,
        message: "Already register",
      });
    }

    await Services.add({ email, password });

    res.status(201).json({
      status: "success",
      code: 201,
      message: "Success register",
    });
  } catch (e) {
    next(e);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await Services.getOne({ email });
    if (!user || !user.validPassword(password)) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Wrong email or password",
      });
    }
    const { SECRET_KEY } = process.env;
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY);
    res.json({
      status: "success",
      code: "200",
      data: {
        token,
      },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { register, login };
