const passport = require("passport");

const jwtAuthenticate = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (!user || error || !user.token) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorize",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = jwtAuthenticate;
