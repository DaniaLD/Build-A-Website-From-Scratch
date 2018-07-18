const User = require('app/models/users');
const middleware = require('./middleware');

class RememberLogin extends middleware {
    handle(req, res, next) {
        if(! req.isAuthenticated()) {
            const rememberToken = req.signedCookies.remember_token;
            
            if (rememberToken) return this.userFind(req, rememberToken, next);
        }

        next();
    }

    userFind(req, rememberToken, next) {
        User.findOne({ rememberToken })
        .then(user => {
            if(user) {
                req.login(user, err => {
                    if(err) next(err);
                    next();
                });
            } else next();
        }).catch(err => next(err));

        return;
    }
}

module.exports = new RememberLogin();