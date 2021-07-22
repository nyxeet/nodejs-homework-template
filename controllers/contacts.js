const { HttpCode } = require("../helpers/constants");
const Services = require("../services/contacts");
const { ObjectId } = require("mongodb");

const list = async (req, res, next) => {
  try {
    const contacts = await Services.list();
    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const contact = await Services.getById(ObjectId(req.params.contactId));
    if (contact) {
      res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found contact",
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};
const create = async (req, res, next) => {
  try {
    const contact = await Services.create(req.body);
    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const contact = await Services.remove(ObjectId(req.params.contactId));
    if (contact) {
      res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found contact",
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  if (!req.body) {
    return next({
      status: HttpCode.BAD_REQUEST,
      message: "Missing fields",
      data: "Not Found",
    });
  }
  try {
    const contact = await Services.update(
      ObjectId(req.params.contactId),
      req.body
    );
    if (contact) {
      res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found contact",
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const patch = async (req, res, next) => {
  if (!req.body) {
    return next({
      status: HttpCode.BAD_REQUEST,
      message: "Missingfield favorite",
      data: "Not Found",
    });
  }
  try {
    const contact = await Services.updateStatusContact(
      ObjectId(req.params.contactId),
      req.body
    );
    if (contact) {
      res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found contact",
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { list, getById, create, remove, update, patch };
