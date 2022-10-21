const jwt = require('jsonwebtoken');
const env = require('../config.env');


class Jwt {
    sign = function(payload) {
        return jwt.sign(payload, env.JWT_KEY, {
            algorithm: 'HS256',
            expiresIn: 60*10
        });
    }
    verify = function(token) {
        const result = jwt.verify(token, env.JWT_KEY);
        
        if (result instanceof Error) {
            throw result;
        }
        return result;
    }
    refresh = function() {
        return jwt.sign({}, env.JWT_KEY, {
            algorithm: 'HS256',
            expiresIn: 60*60*24
        });
    }
}


exports.jwt = new Jwt();