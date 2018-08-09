const controller = require('app/http/controllers/controller');
const passport = require('passport');

class registerController extends controller{
    showRegisterationForm(req, res) {
        const title = 'صفحه عضویت';
        res.render('home/auth/register', { recaptcha: this.recaptcha.render(), title });
    }

    async registerProcess(req, res, next) {
        await this.recaptchaValidation(req, res);
        let result = await this.validationData(req);

        if(result) {
            return this.register(req, res, next);
        }

        return this.back(req, res);
    }

    register(req, res, next) {
        passport.authenticate('my_local_register', {
            successRedirect: '/',
            failureRedirect: '/auth/register',
            failureFlash: true
        })(req, res, next);
    }
}

module.exports = new registerController();