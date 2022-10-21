const jwt = require('jsonwebtoken');
const { port } = require('../config.env');


class Jwt {
    sign = function(payload) {
        return jwt.sign(payload, port.JWT_KEY, {
            algorithm: 'HS256',
            expiresIn: 60*10
        });
    }
    verify = function(token) {
        const result = jwt.verify(token, port.JWT_KEY);
        
        if (result instanceof Error) {
            throw result;
        }
        return result;
    }
    refresh = function() {
        return jwt.sign({}, port.JWT_KEY, {
            algorithm: 'HS256',
            expiresIn: 60*60*24
        });
    }
}


exports.jwt = new Jwt();