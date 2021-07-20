const Contact = require("./schemas/contact");

const list = async () => {
  return Contact.find();
};

const getById = (id) => {
  return Contact.findOne({ _id: id });
};

const create = (body) => {
  return Contact.create(body);
};

const update = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const remove = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
