const { HttpCode } = require("../helpers/constants");
const Services = require("../services/user");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);

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
    try {
      const verifyToken = nanoid();
      const result = await Services.add({
        email,
        password,
        subscription,
        verifyToken,
      });
      const message = {
        to: result.email,
        from: "nchikunova@ex.ua",
        subject: "Email verification",
        text: "Email verification",
        html: `<a href="http://localhost:3000/api/auth/verify/${verifyToken}">Verify email</a>`,
      };

      await sgMail.send(message);

      res.status(201).json({
        status: "success",
        code: 201,
        data: {
          user: {
            email: result.email,
            subscription: result.subscription,
          },
        },
      });
    } catch (e) {
      next(e);
    }
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
const verify = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await Services.findUserByVerifyToken(verificationToken);
    if (user) {
      await Services.updateVerify(user._id, true, null);
      return res.json({
        status: "success",
        code: 200,
        message: "Verification successful",
      });
    }
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "User not found",
    });
  } catch (e) {
    next(e);
  }
};
const repeatVerification = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Services.getOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
      });
    }
    const { verify, verifyToken } = user;
    if (!verify) {
      const message = {
        to: email,
        from: "nchikunova@ex.ua",
        subject: "Email verification",
        text: "Email verification",
        html: `<a href="http://localhost:3000/api/auth/verify/${verifyToken}">Verify email</a>`,
      };

      await sgMail.send(message);
      return res.json({
        status: "success",
        code: 200,
        data: {
          message: "Verification email sent",
        },
      });
    }
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Verification has already been passed",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, logout, verify, repeatVerification };
