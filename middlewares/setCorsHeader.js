

class SetHeader {
    corsHeader = function(req, res, next) {
        const origin = req.headers?.origin;
        console.log(origin);
        res.set({
            'Access-Control-Allow-Headers': 'X-Requested-With',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Control': origin || ['http://localhost:3000']
        });
        next();
    }
}

module.exports = new SetHeader();