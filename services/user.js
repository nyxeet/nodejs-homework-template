const User = require("./schemas/user");

const getAll = () => {
  return User.find({});
};

const getOne = (filter) => {
  return User.findOne(filter);
};

const getById = (id) => {
  return User.findById(id);
};
const add = ({ email, password, subscription, verifyToken }) => {
  const newUser = new User({ email, subscription, verifyToken });
  newUser.setPassword(password);
  return newUser.save();
};
const updateById = (id, body) => {
  return User.findByIdAndUpdate(id, body, { new: true });
};
const findUserByVerifyToken = (verifyToken) => {
  return User.findOne({ verifyToken });
};
const updateVerify = async (id, verify, verifyToken) => {
  return await User.updateOne({ _id: id }, { verify, verifyToken });
};

module.exports = {
  getAll,
  getOne,
  getById,
  add,
  updateById,
  findUserByVerifyToken,
  updateVerify,
};
