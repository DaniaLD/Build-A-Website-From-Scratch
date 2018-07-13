const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').Recaptcha;

module.exports = class controller {
    constructor() {
        autoBind(this);
        this.recaptchaConfig();
    }

    recaptchaConfig() {
        this.recaptcha = new Recaptcha(
            '6LdvFmQUAAAAAC871CeflrlF3550PpNKkQQ3PSn8',
            '6LdvFmQUAAAAADL0Frf58y613paBY2jwaGuFHnkL',
            { hl: 'fa' }
        );
    }

    recaptchaValidation(req, res) {
        return new Promise((resolve, reject) => {
            this.recaptcha.verify(req, (err, data) => {
                if(err) {
                    req.flash('errors', 'گزینه مربوط به بررسی ربات خاموش میباشد ، لطفا از روشن بودن آن امتحان حاصل نمایید سپس دوباره امتحان نمایید.');
                    res.redirect(req.url);
                } else resolve(true);
            })
        })
    }
}