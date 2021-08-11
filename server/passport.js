const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {User} = require('./models/user.models');
const JwtStrategy = require('passport-jwt').Strategy;

const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
}

passport.use(new JwtStrategy({
    
    jwtFromRequest: cookieExtractor,
    secretOrKey: "khalil"
},(payload, done) => {
    User.findById({_id:payload.sub}, (err, user) => {
        if (err) {
            return done(err,false);
        }
        if(user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    })
}))

passport.use(new LocalStrategy({ usernameField: "name" }, (name, password, done) => {
    console.log("sdsds")
    User.findOne({name}, (err, user) => {
        console.log(user)
        if(err) {
            return done(err);
        }
        if(!user) {
            return done(null, false);
        }
        user.comparePassword(password, done);
    });
    
}));