const validator = require('./validators');
const { check } = require('express-validator/check');
const Course = require('app/models/courses');
const path = require('path');

class courseValidator extends validator {
    handle() {
        return [
            check('title')
                .isLength({ min: 5 })
                .withMessage('عنوان نمیتواند کمتر از 5 کاراکتر باشد.')
                .custom(async value => {
                    let course = await Course.findOne({ slug: this.slug(value) });
                    if(course) {
                        throw new Error('چنین دوره ای با این عنوان قبلا در سایت قرار داد شده است.');
                    }
                }),
            
            check('images')
                .custom(async value => {
                    if(! value)
                        throw new Error('وارد کردن تصویر الزامی است.');
                    
                    let fileExtentions = ['.png' , '.jpg' , '.jpeg' , '.svg'];
                    if(! fileExtentions.includes(path.extname(value)))
                        throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست.');
                }),

            check('type')
                .not().isEmpty()
                .withMessage('فیلد نوع دوره نمیتواند خالی بماند.'),

            check('body')
                .isLength({ min: 20 })
                .withMessage('متن دوره نمیتواند کمتر از 20 کاراکتر باشد.'),

            check('price')
                .not().isEmpty()
                .withMessage('قیمت دوره نمیتواند خالی بماند.'),
            
            check('tags')
                .not().isEmpty()
                .withMessage('فیلد تگ نمیتواند خالی بماند.')
    ]
    }

    slug(title) {
        // change RegEx later
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, "-");
    }
}

module.exports = new courseValidator();