const { HttpCode } = require("../helpers/constants");
const Services = require("../services/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getProfile = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Unauthorize",
    });
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Unauthorize",
    });
  }
  try {
    const { SECRET_KEY } = process.env;
    const { id } = jwt.verify(token, SECRET_KEY);
    const { email } = Services.getById(id);
    const result = {
      email,
    };
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Invalid token",
    });
  }
};

module.exports = { getProfile };
