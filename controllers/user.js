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

module.exports = { getProfile };
