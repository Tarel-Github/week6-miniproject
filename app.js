const express = require('express');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const path = require('path');

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
    }

    router() {
        this.app.use('/', indexRouter);
    }
}

module.exports = new App();





