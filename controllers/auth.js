const { HttpCode } = require("../helpers/constants");
const Services = require("../services/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  try {
    const result = await Services.getOne({ email });

    if (result) {
      res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        message: "Email in use",
      });
    }
    const newUser = await Services.add({
      email,
      password,
      subscription,
    });

    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      message: "Success register",
      data: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
      },
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
      res.status(HttpCode.BAD_REQUEST).json({
        status: "error",
        code: HttpCode.BAD_REQUEST,
        message: "Wrong email or password",
      });
    }
    const { SECRET_KEY } = process.env;
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY);
    await Services.updateById(user._id, { token });
    res.json({
      status: "success",
      code: HttpCode.OK,
      data: {
        token,
      },
    });
  } catch (e) {
    next(e);
  }
};
const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await Services.getById(_id);
    await Services.updateById(user._id, { token: null });
    res.json({
      status: "success",
      code: 204,
      message: "success logout",
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { register, login, logout };
