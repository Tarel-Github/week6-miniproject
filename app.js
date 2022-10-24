const express = require('express');
const session = require('express-session');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportConfig = require('./passport');
const path = require('path');
const env = require('./config.env');

const indexRouter = require('./index');


class App {

    constructor() {
        this.app = express();
        this.middleware();
        this.router();
    }

    middleware() {
        this.app.use(express.static(path.join(__dirname, 'public')));

        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(fileupload({
            limits: {
                fileSize: 10000000, // 10Mb
            },
            abortOnLimit: true,
        }));

        passportConfig();
        // passport authorize 사용할 시 resave: true, cookie.secure: false
        this.app.use(session({
            resave: false,
            saveUninitialized: false,
            secret: env.SESSION_KEY,
            cookie: { 
                secure: true,
                // maxAge: Date.now() + 60*60*24
            },
        }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    router() {
        this.app.use('/', indexRouter);
    }
}

module.exports = new App();





