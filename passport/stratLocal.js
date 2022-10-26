const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../user/user.service');

module.exports = function() {
    passport.use(new LocalStrategy(
        'local', 
        async function verify(username, password, done) {
            const payload = await User.signin({ username, password });            

            return done(null, payload);
        }
    ));
}