const middleware = require('./middleware');

class converFileToField extends middleware {

    /*
        this middleware has been written for checking, if there aren't any images then assign it to undefiend but
        if there is an image, in this case it wont show "Image is necessary" error.
    */
    handle(req, res, next) {
        if(! req.file)
            req.body.images = undefined;
        else
            req.body.images = req.file.filename;

        next();
    }
}

module.exports = new converFileToField();