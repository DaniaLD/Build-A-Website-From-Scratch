const controller = require('app/http/controllers/controller');
const User = require('app/models/users');
const PasswordReset = require('app/models/password-reset');

class resetPasswordController extends controller{
    showResetPasswordForm(req, res) {
        const title = 'بازیابی رمز عبور';
        res.render('home/auth/passwords/reset', { recaptcha: this.recaptcha.render(), title, token: req.params.token });
    }

    async resetPasswordProcess(req, res) {
        await this.recaptchaValidation(req, res);
        let result = await this.validationData(req);

        if(result) {
            return this.resetPassword(req, res);
        }

        req.flash('formData', req.body);
        return this.back(req, res);
    }

    async resetPassword(req, res) {
        let field = await PasswordReset.findOne({ $and: [{ email: req.body.email }, { token: req.body.token }] });       
        if(! field) {
            req.flash('errors', 'اطلاعات وارد شده صحیح نیستند.');
            return this.back(req, res);
        }

        if(field.used) {
            req.flash('errors', 'از این لینک قبلا برای بازیابی پسورد استفاده شده است.');
            return this.back(req, res);
        }

        let user = await User.findOneAndUpdate({ email: field.email }, { $set: { password: req.body.password }});
        if(! user) {
            req.flash('errors', 'متاسفانه عملیات آپدیت با خطا روبرو شد. لطفا دوباره امتحان نمایید.');
            return this.back(req, res);
        }

        await field.update({ used: true });

        return res.redirect('/auth/login');
    }
}

module.exports = new resetPasswordController();