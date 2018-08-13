const controller = require('app/http/controllers/controller');
const Course = require('app/models/courses');
const fs = require('fs');

class coursesController extends controller{
    index(req, res) {
        res.render('admin/courses/index', { title: 'دوره ها' });
    }

    create(req, res) {
        res.render('admin/courses/create');
    }

    async store(req, res) {
        let result = await this.validationData(req);

        if(! result) {
            // Deletes files which have been uploaded, if there are any errors.
            if(req.file)
                fs.unlink(req.file.path, err => {});
            
            return this.back(req, res);
        }

        let images = req.body.images;
        let { title, type, body, price, tags } = req.body;  // Destructure req.body

        let newCourse = new Course({
            title,
            type,
            body,
            price,
            tags,
            images,
            user: req.user._id,
            slug: this.slug(title)
        });

        await newCourse.save();

        return res.redirect('/admin/courses')
    }

    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g , "-")
    }
}

module.exports = new coursesController();