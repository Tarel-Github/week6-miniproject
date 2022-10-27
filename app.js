const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const { corsHeader } = require('./middlewares/setCorsHeader');
const indexRouter = require('./index');
const { errorHandler, errorLogger } = require('./middlewares/errorHandler');


class App {

    constructor() {
        this.app = express();
        this.middleware();
        this.router();
        this.errorHandler();
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
    }

    router() {
        this.app.disable('x-powered-by');
        this.app.use(corsHeader);
        this.app.use('/', indexRouter);
    }

    errorHandler() {
        this.app.use(errorLogger);
        this.app.use(errorHandler);
    }
}

module.exports = new App();