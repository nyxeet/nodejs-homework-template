const Contact = require("./schemas/contact");

const list = async () => {
  return Contact.find();
};

const getById = (id) => {
  return Contact.findOne({ _id: id, owner: userId });
};

const create = (body, userId) => {
  return Contact.create({ ...body, owner: userId });
};

const update = (id, fields, userId) => {
  return Contact.findByIdAndUpdate({ _id: id, owner: userId }, fields, {
    new: true,
  });
};

const remove = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

const updateStatusContact = (id, body) => {
  return Contact.findByIdAndUpdate({ _id: id }, body, { new: true });
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
  updateStatusContact,
};
