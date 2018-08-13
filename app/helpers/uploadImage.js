const multer = require('multer');
const fs = require('fs');
const mkdirp = require('mkdirp');

const getDirImage = () => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();

    return `./public/uploads/images/${year}/${month}/${day}`;
}

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir = getDirImage();

        mkdirp(dir, err => cb(null, dir));
    },
    filename: (req, file, cb) => {
        let myFile = getDirImage() + '/' + file.originalname;

        if(! fs.existsSync(myFile))
            cb(null, file.originalname);
        else {
            fs.unlink(myFile, err => {
                cb(null, file.originalname);
                req.flash('errors', 'فایلی با این اسم قبلا در این پوشه وجود داشت. فایل جدید جایگزین فایل قبلی شد.');
            });
        }
    }
});

const upload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1024 * 1024 * 10    // Maximum size of data 10 MB
    }
});

module.exports = upload;