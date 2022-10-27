const dotenv = require('dotenv');
const path = require('path');

dotenv.config();


class DbConnection {
    constructor() {
        this.MODE = process.env.NODE_ENV || 'development';
        this.DB_HOST = process.env.DB_HOST;
        this.DB_NAME = process.env.DB_NAME;
        this.DB_USER = process.env.DB_USER;
        this.DB_PASSWORD = process.env.DB_PASSWORD;
    }
}

class Env extends DbConnection {
    constructor() {
        super();

        this.PORT = Number(process.env.PORT);

        this.SALT_ROUND = Number(process.env.SALT_ROUND);
        this.JWT_KEY = process.env.JWT_KEY;
        this.PASS = process.env.PASS;

        this.ROOT = path.resolve(__dirname);
        this.PROF_DIR = path.join(process.env.PROF_DIR);
        this.POST_DIR = path.join(process.env.POST_DIR);


        this.REST_API_KEY = process.env.REST_API_KEY;
        this.REDIRECT_URI = path.join(__dirname, 'signin', 'kakao', 'callback');
    }
}


module.exports = new Env();