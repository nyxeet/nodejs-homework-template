const fs = require("fs").promises;
const path = require("path");
const jimp = require("jimp");
const avatarsDir = path.join(__dirname, "../", "public", "avatars");
const Services = require("../services/user");

const getProfile = async (req, res, next) => {
  const result = {
    email: req.user.email,
  };
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};
const updateAvatar = async (req, res, next) => {
  const { id, email } = req.user;
  if (req.file) {
    const { file } = req;
    const avatar = await jimp.read(file.path);
    await avatar
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(file.path);

    await fs.rename(
      file.path,
      path.join(avatarsDir, `${email}-${id}.${file.originalname.split(".")[1]}`)
    );

    const avatarURL = path.join(
      "public/avatars/",
      `${email}-${id}.${file.originalname.split(".")[1]}`
    );
    const user = await Services.updateById(id, { avatarURL });
    res.json({
      message: "Avatar successfully updated",
      status: "success",
      code: 200,
      data: {
        avatarURL: user.avatarURL,
      },
    });
  } else {
    res.json({
      message: "File is not exist",
      status: "error",
      code: 404,
      data: "Not found",
    });
  }
};

module.exports = { getProfile, updateAvatar };
