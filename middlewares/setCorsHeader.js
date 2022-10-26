

class SetHeader {
    corsHeader = function(req, res, next) {
        const origin = req.headers?.origin;

        res.set({
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': origin || ['http://localhost:3000']
        });
        next();
    }
}

module.exports = new SetHeader();