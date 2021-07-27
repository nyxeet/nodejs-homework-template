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
const add = ({ email, password }) => {
  const newUser = new User({ email });
  newUser.setPassword(password);
  return newUser.save();
  // User.create(newUser);
};

module.exports = { getAll, getOne, getById, add };
