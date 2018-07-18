const User = require('app/models/users');
const middleware = require('./middleware');

class redirectIfAuthenticated extends middleware {
    handle(req, res, next) {
        if(req.isAuthenticated()) return res.redirect('/');

        next();
    }
}

module.exports = new redirectIfAuthenticated();