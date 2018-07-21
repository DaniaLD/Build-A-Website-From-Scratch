const express = require('express');
const app = express();
const http = require('http');
const port = 3000 || process.env.PORT;
const path = require('path');
const bodyParser =  require('body-parser');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const Helpers = require('./helpers');
const rememberLogin = require('app/http/middlewares/rememberLogin')

module.exports = class Application {
    constructor() {
        this.setupExpress();
        this.setMongoConnection();
        this.setConfig();
        this.setRouters();
    }

    setupExpress() {
        const server = http.createServer(app);
        server.listen(config.port, () => {
            console.log(`app is listenning on port: ${config.port}`);
        });
    }

    setMongoConnection() {
        mongoose.Promise = global.Promise;
        mongoose.connect(config.database.url, {useNewUrlParser: true}, err => {
            if (err) {
                console.log(`Couldn't connect to mongodb !!! => Error : ${err}`);
            } else {
                console.log('Connected to mongodb successfully ...');
            }
        });
    }

    setConfig() {
        app.use(express.static('public'));
        app.set('view engine', 'ejs');
        app.set('views', path.resolve('./resource/views'));

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        app.use(validator());

        app.use(session({...config.session}));
        app.use(cookieParser(config.cookieSecretKey));

        app.use(passport.initialize());
        app.use(passport.session());
        require('app/passport/passport-local');

        app.use(flash());

        app.use(rememberLogin.handle);

        // Local Variables
        app.use((req, res, next) => {
            app.locals = new Helpers(req, res).getObjects();
            next();
        });
    }

    setRouters() {
        app.use(require('app/routes/web/index'));
        app.use(require('app/routes/api/index'));
    }
}