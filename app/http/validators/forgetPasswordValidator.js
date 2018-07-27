const validator = require('./validators');
const { check } = require('express-validator/check');

class forgetPasswordValidator extends validator {
    handle() {
        return [
            check('email')
                .isEmail()
                .withMessage('فیلد ایمیل معتبر نیست.')
        ]
    }
}

module.exports = new forgetPasswordValidator();