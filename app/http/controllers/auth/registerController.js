const controller = require('app/http/controllers/controller');

class registerController extends controller{
    showRegisterationForm(req, res) {
        res.render('auth/register');
    }
}

module.exports = new registerController();