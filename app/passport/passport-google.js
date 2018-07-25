const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('app/models/users');

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
   
passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('google', new GoogleStrategy({
    clientID: config.service.google.client_id,
    clientSecret: config.service.google.client_secret,
    callbackURL: config.service.google.callback_url
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne({email: profile.emails[0].value}, (err, user) => {
            if(err) return done(err);
            if(user) return done(null, user);

            const newUser = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: profile.id
            });

            newUser.save(err => {
                if(err) throw err;
                return done(null, newUser);
            });
        });
    }
));