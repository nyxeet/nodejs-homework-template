const passport = require("passport");

const Services = require("../services/user");
require("dotenv").config();

const Strategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const secret = process.env.SECRET_KEY;

const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await Services.getById(payload.id);
      if (!user) {
        return done(new Error("User not found"));
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);
