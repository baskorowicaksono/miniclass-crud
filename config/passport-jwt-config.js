const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const { User } = require("../models");

module.exports = () => {
    const opts = {};
    opts.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET;
    passport.use(new JWTStrategy(opts, async (jwt_payload, done) => {
        await User.findAll({where: {uuid: jwt_payload.uuid}})
        .then(user => user ? done(null, user) : done(null, false))
        .catch(err => done(err, false));
    }))
}