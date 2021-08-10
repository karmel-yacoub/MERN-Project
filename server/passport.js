const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {User} = require('./models/user.models');
const JwtStrategy = require('pas')

passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: "khalil"
},(payload, done) => {
    User.findById({_id:payload.sub}, (err, user))
}))

passport.use(new LocalStrategy( (username, password, done) => {
    {
        User.findOne({username}, (err, user) => {
            if(err) {
                return done(err);
            }
            if(!user) {
                return done(null, false);
            }
            User.comparePassword(password, done);
        })
    }
}));