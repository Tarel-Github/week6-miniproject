const passport = require('passport');
// const LocalStrategy = require('passport-local');
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

// module.exports = function() {
//     passport.use(new LocalStrategy(function verify(username, password, cb) {
//         const user = {
//             userId: 1,
//             username,
//             nickname: 'local'
//         };
        
//         return cb(null, user);
//     }));    
// }


// const KakaoStrategy = require('passport-kakao');
// passport.use(new KakaoStrategy({
//     clientID: env.REST_API_KEY,
//     clientSecret: '',
//     callbackURL: env.REDIRECT_URI,
// },
// (accessToken, refreshToken, profile, done) => {
//     console.log('accessToken: ', accessToken);
//     console.log('refreshToken: ', refreshToken);
//     console.log('profile: ', profile);
// }
// ));