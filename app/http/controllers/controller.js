const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').Recaptcha;
const { validationResult } = require('express-validator/check');

module.exports = class controller {
    constructor() {
        autoBind(this);
        this.recaptchaConfig();
    }

    recaptchaConfig() {
        this.recaptcha = new Recaptcha(
            config.service.recaptcha.site_key,
            config.service.recaptcha.secret_key,
            {...config.service.recaptcha.options}
        );
    }

    recaptchaValidation(req, res) {
        return new Promise((resolve, reject) => {
            this.recaptcha.verify(req, (err, data) => {
                if(err) {
                    req.flash('errors', 'گزینه مربوط به بررسی ربات خاموش میباشد ، لطفا از روشن بودن آن امتحان حاصل نمایید سپس دوباره امتحان نمایید.');
                    this.back(req, res);
                } else resolve(true);
            })
        })
    }

    
    async validationData(req) {
        const result = validationResult(req);

        if(! result.isEmpty()) {
            const errors = result.array();
            const messages = [];
            errors.forEach(err => messages.push(err.msg));
            
            if(errors.length == 0) return true;
            
            req.flash('errors', messages);
            return false;
        }

        return true;
    }

    back(req, res) {
        return res.redirect(req.header('Referer') || '/');
    }
}