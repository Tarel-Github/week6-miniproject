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
        this.SESSION_KEY = process.env.SESSION_KEY;

        this.SALT_ROUND = Number(process.env.SALT_ROUND);
        this.JWT_KEY = process.env.JWT_KEY;
        this.ROOT = path.resolve(__dirname);
        this.PROF_DIR = process.env.PROF_DIR;

        this.PASS = process.env.PASS;

        this.REST_API_KEY = process.env.REST_API_KEY;
        this.REDIRECT_URI = process.env.REDIRECT_URI;
    }
}


module.exports = new Env();