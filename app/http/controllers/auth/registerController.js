const controller = require('app/http/controllers/controller');

class registerController extends controller{
    showRegisterationForm(req, res) {
        res.render('auth/register', { messages: req.flash('errors') });
    }

    registerProcess(req, res, next) {
        this.validationData(req)
        .then(result => {
            if(result) res.json('Register Process');
            else res.redirect('/register');
        })
        
    }

    validationData(req) {
        req.checkBody('name', 'فیلد نام نمیتواند خالی باشد.').notEmpty();
        req.checkBody('name', 'فیلد نام نمیتواند کمتر از 5 کاراکتر باشد.').isLength({ min: 5 });
        req.checkBody('email', 'فیلد ایمیل نمیتواند خالی باشد.').notEmpty();
        req.checkBody('email', 'فیلد ایمیل معتبر نیست.').isEmail();
        req.checkBody('password', 'فیلد پسورد نمیوتواند خالی باشد.').notEmpty(); 
        req.checkBody('password', 'فیلد پسورد نمیتواند کمتر از 8 کاراکتر باشد.').isLength({ min: 8 });

        return req.getValidationResult()
        .then(result => {
            const errors = result.array();
            const messages = [];
            errors.forEach(err => messages.push(err.msg));
            
            if(errors.length == 0) return true;
            
            req.flash('errors', messages);
            return false;
        })
        .catch(err => console.log(err));
    }
}

module.exports = new registerController();