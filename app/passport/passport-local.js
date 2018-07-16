const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('app/models/users');

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
   
passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('my_local_register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    },
    (req, email, password, done) => {
        User.findOne({ 'email': email }, (err, user) => {
            if(err) {
                return done(err);
            }

            if(!user) {
                const newUser = new User({
                    name: req.body.name,
                    email,
                    password
                });
                newUser.save(err => {
                    if(err) { 
                        return done(err, false, req.flash('errors', 'ثبت نام با موفقیت انجام نشد ، لطفا دوباره امتحان نمایید.'));
                    } else {
                        return done(null, newUser);
                    }
                });
            } else {
                return done(null, false, req.flash('errors', 'چنین کاربری قبلا در سایت ثبت نام نموده است.'));
            }
        });
    }
));