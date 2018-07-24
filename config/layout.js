const path = require('path');
const expressLayouts = require('express-ejs-layouts');

module.exports = {
    publicDir: 'public',
    viewsDir: path.resolve('./resource/views'),
    viewEngine: 'ejs',
    ejs: {
        expressLayouts,
        extractScripts: true,
        extractStyles: true,
        master: 'home/master'
    }
}