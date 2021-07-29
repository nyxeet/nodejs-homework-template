/* eslint-disable semi */
/* eslint-disable quotes */
const Joi = require("joi");
const { HttpCode } = require("../helpers/constants");

const schemaRegisterUser = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});
const schemaLoginUser = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);
  if (error) {
    const [{ message }] = error.details;

    return next({
      status: HttpCode.BAD_REQUEST,
      message,
      data: "Bad Request",
    });
  }
  next();
};

module.exports.validateRegisterUser = (req, res, next) => {
  return validate(schemaRegisterUser, req.body, next);
};
module.exports.validateLoginUser = (req, res, next) => {
  return validate(schemaLoginUser, req.body, next);
};
