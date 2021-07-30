const Contact = require("./schemas/contact");

const list = async (userId) => {
  return Contact.find({ owner: userId });
};

const getById = (id, userId) => {
  return Contact.findOne({ _id: id, owner: userId });
};

const create = (body, userId) => {
  return Contact.create({ ...body, owner: userId });
};

const update = (id, fields, userId) => {
  return Contact.findOneAndUpdate({ _id: id, owner: userId }, fields, {
    new: true,
  });
};

const remove = (id, userId) => {
  return Contact.findOneAndRemove({ _id: id, owner: userId });
};

const updateStatusContact = (id, body, userId) => {
  return Contact.findOneAndUpdate({ _id: id, owner: userId }, body, {
    new: true,
  });
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
  updateStatusContact,
};
