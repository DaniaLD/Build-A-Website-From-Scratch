const controller = require('app/http/controllers/controller');
const User = require('app/models/users');
const PasswordReset = require('app/models/password-reset');
const uniqueString = require('unique-string');

class forgetPasswordController extends controller{
    showForgetPasswordForm(req, res) {
        const title = 'فراموشی رمز عبور';
        res.render('home/auth/passwords/email', { errors: req.flash('errors'), recaptcha: this.recaptcha.render(), title });
    }

    async sendPasswordResetLink(req, res) {
        await this.recaptchaValidation(req, res);
        let result = await this.validationData(req);

        if(result) {
            return this.sendResetLink(req, res);
        }

        return this.back(req, res);
    }

    async sendResetLink(req, res) {
        let user = await User.findOne({ email: req.body.email });
        if(! user) {
            req.flash('errors', 'کاربری با این اطلاعات یافت نشد.');
            return this.back(req, res);
        }

        const newPasswordResset = new PasswordReset({
            email: user.email,
            token: uniqueString()
        });

        await newPasswordResset.save();

        /* 
        Send Email
        */

        res.redirect('/');
    }
}

module.exports = new forgetPasswordController();