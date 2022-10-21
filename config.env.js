const dotenv = require('dotenv');
const path = require('path');

dotenv.config();


class Env {
    constructor() {
        this.PORT = Number(process.env.PORT);
        this.SALT_ROUND = Number(process.env.SALT_ROUND);
        this.JWT_KEY = process.env.JWT_KEY;
        this.ROOT = path.resolve(__dirname);
        this.PROF_DIR = process.env.PROF_DIR
    }
}


exports.env = new Env();