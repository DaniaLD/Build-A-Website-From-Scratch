const express = require('express');
const app = express();
const http = require('http');
const port = 3000 || process.env.PORT;
const path = require('path');
const bodyParser =  require('body-parser');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');

module.exports = class Application {
    constructor() {
        this.setupExpress();
        this.setMongoConnection();
        this.setConfig();
    }

    setupExpress() {
        const server = http.createServer(app);
        server.listen(port, () => {
            console.log(`app is listenning on port: ${port}`);
        });
    }

    setMongoConnection() {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost:27017/Build-A-Website-From-Scratch', {useNewUrlParser: true}, err => {
            if (err) {
                console.log(`Couldn't connect to mongodb !!! => Error : ${err}`);
            } else {
                console.log('Connected to mongodb successfully ...');
            }
        });
    }

    setConfig() {
        app.use(express.static(__dirname + '/public'));
        app.set('view engine', 'ejs');
        app.set('views', path.resolve('./resource/views'));

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        app.use(validator());

        app.use(session({
            secret: 'mysecretkey',
            resave: true,
            saveUninitialized: true,
            store: new MongoStore({mongooseConnection: mongoose.connection})
        }));
        app.use(cookieParser('mysecretkey'));

        app.use(flash());

        app.get('/', (req, res) => {
            res.send('Hello world!');
        });
    }
}