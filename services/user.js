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
const add = ({ email, password, subscription, token }) => {
  const newUser = new User({ email, subscription, token });
  newUser.setPassword(password);
  return newUser.save();
};
const updateById = (id, body) => {
  return User.findByIdAndUpdate(id, body, { new: true });
};

module.exports = { getAll, getOne, getById, add, updateById };
